let myRequest = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/poll';

const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

myRequest.addEventListener('readystatechange', () => {
    if(myRequest.readyState === myRequest.DONE) {
        const poll = JSON.parse(myRequest.responseText);
        let html = '';
        pollTitle.innerText  = poll.data.title;
        for (let answer in poll.data.answers) {
            html += `<button class="poll__answer">${poll.data.answers[answer]}</button>`;
        }
        pollAnswers.innerHTML = html;

        const buttons = Array.from(document.querySelectorAll(".poll__answer"));
        buttons.forEach((button) => {
            button.addEventListener('click', (e) => {
                alert("Спасибо, ваш голос засчитан!");
                const xhr = new XMLHttpRequest;
                xhr.addEventListener('readystatechange', () => {
                    if(xhr.readyState === xhr.DONE) {
                        const stat = JSON.parse(xhr.responseText);
                        html = '';
                        let summVotes = 0;
                        for (let statAnswer in stat.stat) {
                            summVotes += Number(stat.stat[statAnswer].votes);
                        }
                        for (let statAnswer in stat.stat) {
                            html += `${stat.stat[statAnswer].answer}: <b>${Math.floor(stat.stat[statAnswer].votes / summVotes * 10000) / 100}%</b></br>`;
                        }
                        pollAnswers.innerHTML = html;
                    }
                });
                xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                let query =`vote=${poll.id}&answer=${poll.data.answers.indexOf(e.target.innerText)}`;
                xhr.send(query);
            });
        });
    }
    
});

myRequest.open('GET', url);
myRequest.send();