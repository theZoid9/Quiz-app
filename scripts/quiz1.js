fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // You will see your JSON data in the browser console
    
    // Example: Display data on the page
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  })
  .catch(err => console.error('Fetch error:', err));