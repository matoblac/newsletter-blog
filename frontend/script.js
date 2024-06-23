document.addEventListener('DOMContentLoaded', (event) => {
    fetchNewsletters();

    async function fetchNewsletters() {
        const startDate = '2023-01-01'; // Example start date
        const endDate = '2023-12-31'; // Example end date

        const response = await fetch(`https://<api-id>.execute-api.<region>.amazonaws.com/prod/newsletters?startDate=${startDate}&endDate=${endDate}`);
        const newsletters = await response.json();

        const container = document.getElementById('newsletter-container');
        newsletters.forEach(newsletter => {
            const div = document.createElement('div');
            div.className = 'newsletter';
            div.innerHTML = `
                <h2>${newsletter.Title}</h2>
                <p>${newsletter.Content}</p>
                <small>${newsletter.Date}</small>
            `;
            container.appendChild(div);
        });
    }
});
