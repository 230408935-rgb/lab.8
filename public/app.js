const output = document.querySelector('#output');

async function callRoute(path, method) {
  output.textContent = 'Loading...';
  try {
    const response = await fetch(path, { method });
    const text = await response.text();

    let body = text;
    try {
      body = JSON.stringify(JSON.parse(text), null, 2);
    } catch {
    }

     output.textContent = `${method} ${path}\nStatus: ${response.status} ${response.statusText}\n\n${body}`;
  } catch (error) {
    output.textContent = `Request failed: ${error.message}`;
  }
}
document.querySelectorAll('button[data-path]').forEach((button) => {
  button.addEventListener('click', () => {
    callRoute(button.dataset.path, button.dataset.method || 'GET');
  }); 
});
