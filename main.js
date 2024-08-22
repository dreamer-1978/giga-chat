import axios from 'axios'

const btn = document.querySelector('.btn')
const form = document.querySelector('.form')
const text = document.querySelector(".question-text");
const request = document.querySelector('.request');

async function sendFetch(event) {
    event.preventDefault()
    const formData = new FormData(form);
    const content = formData.get("input-text");
    const response = await axios("https://giga-chat-teal.vercel.app//data", {
      params: {
        content: content,
      },
    });
    const data = await response.data.message
    text.innerHTML = data
    form.reset()
    form.focus()
}


form.addEventListener('submit', sendFetch)
