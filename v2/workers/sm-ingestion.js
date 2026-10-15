export default {
  // Receive SNS webhook via HTTP POST
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const messageType = request.headers.get("x-amz-sns-message-type");

    if (messageType === "SubscriptionConfirmation") {
      const subscribeUrl = body.SubscribeURL;
      try {
        const confirmResponse = await fetch(subscribeUrl);
        if (!confirmResponse.ok) {
          return new Response("Failed to confirm subscription", { status: 502 });
        }
        return new Response("Subscription confirmed", { status: 200 });
      } catch (err) {
        return new Response("Error confirming subscription: " + err.message, { status: 500 });
      }
    }

    if (messageType === "Notification") {
      const message = body.Message;
      try {
        await env.SM_QUEUE.send(message);
        return new Response("OK", { status: 200 });
      } catch (err) {
        return new Response("Failed to enqueue message: " + err.message, { status: 500 });
      }
    }

    if (messageType === "UnsubscribeConfirmation") {
      return new Response("OK", { status: 200 });
    }

    return new Response("Unknown message type", { status: 400 });
  },
};
