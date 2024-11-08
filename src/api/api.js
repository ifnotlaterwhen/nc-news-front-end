import axios from "axios";

const api = axios.create({
    baseURL: 'https://be-nc-news-8qqi.onrender.com/api'
})

const getAllTopics = () => {
    return api.get('/topics').then(({data}) =>{
        return data.topics
    })
}


const getAllArticles = (params) =>{
    return api.get(`/articles`, params)
    .then(({data})=>{
        return data.articles
    })
}

const getArticleById = (id) => {
    return api.get(`/articles/${id}`)
    .then(({data}) => {
        return data.article
    })
}

const getCommentsByArticleId = (id)=>{
    return api.get(`/articles/${id}/comments`)
    .then(({data})=>{
        return data.comments
    })
}

const postCommentByArticleId = (id, body)=>{
    return api.post(`/articles/${id}/comments`,body)
    .then(({data})=>{
        return data.comment;
    })
}

const patchCommentVoteById = (comment_id, inc_votes)=>{
    return api.patch(`/comments/${comment_id}`, inc_votes)
    .then(({data})=>{
        console.log(data)
        return data
    })
}
const patchArticleVoteById = (article_id, inc_votes)=>{
    return api.patch(`/articles/${article_id}`, inc_votes)
    .then(({data})=>{
        console.log(data)
        return data
    })
}

const deleteCommentById = (comment_id)=>{
    return api.delete(`/comments/${comment_id}`)
}

export {getAllTopics, getAllArticles, getCommentsByArticleId, getArticleById, postCommentByArticleId, patchCommentVoteById, deleteCommentById, patchArticleVoteById};