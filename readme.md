# Embeddings API - Iowa Code Camp

The purpose of this API is to provide some examples of how users can leverage text embeddings using OpenAI's Node.js library.

## The Stack

This project leverages Docker, Node.js, Express, Typescript, and OpenAI's Node.js library.

## Running the Project

First make sure you have Docker Desktop installed on your machine.

* [Docker](https://www.docker.com/)

Once installed and running, inside a terminal from the root directory of this project, run the command `docker compose up`.

To stop the server, run `docker compose down`.

## Links to Documentation

* [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
* [OpenAI Node.js Library](https://www.npmjs.com/package/openai)

## Endpoints

* Conversation with gpt-3.5-turbo - http://localhost:5000/chat/conversation
```
[
    {
        "role":"user",
        "content": "What do you know about the company We Write Code in Des Moines Iowa?"
    }
]
```
* Simple text completion with Davinci model - http://localhost:5000/chat/completion
```
{
    "prompt": "What do you know about the company We Write Code in Des Moines Iowa?"
}
```
* Create text embedding - http://localhost:5000/embedding/simple
```
{
    "prompt": "coffee"
}
```
* Compare words to list of words - http://localhost:5000/embedding/comparison
```
{
    "wordToCompare": "coffee",
    "wordOptions": ["apple", "tea", "car", "happy", "cheese", "water", "orange juice"]
}
```
* Use embeddings to find matching prompt - http://localhost:5000/embedding/prompt-completion
```
{
    "prompt": "What should I bring to this class?"
}
```
* Use embeddings to find matching source text - http://localhost:5000/embedding/find-relevant-text
```
{
    "prompt": "How much rain does Iowa get each year?"
}
```
* Answer prompt using GPT with source text - http://localhost:5000/embedding/query-relevant-text
```
{
    "prompt": "How much rain does Iowa get?"
}
```
