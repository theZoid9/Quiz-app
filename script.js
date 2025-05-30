
fetch('../public/data.json')
  .then(res => res.json())
  .then(data => {
    console.log("Quiz data loaded:", data);
   
  });
