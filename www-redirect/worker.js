// Sends www.quantum.observer to the same path on quantum.observer.
export default {
  fetch(request) {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'quantum.observer';
    return Response.redirect(url.toString(), 301);
  },
};
