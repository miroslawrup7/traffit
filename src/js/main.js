fetch("https://grupaprogres.traffit.com/public/job_posts/published", {
    headers: {
        "Content-Type": "application/json",
        "X-Request-Page-Size": "1",
        "X-Request-Current-Page": "1",
    },
})
    .then((response) => response.json())
    .then((response) => {
        console.log(response.ok);
        console.log(response.status);
        console.log(response.body);
        console.log(response);
    })

    .catch((error) => console.log("Błąd: ", error));
