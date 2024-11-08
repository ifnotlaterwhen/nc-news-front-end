import { useEffect, useState } from "react"
import { getAllTopics, getAllArticles } from "../api/api"
import TopicsCard from "./TopicsCard";

export default function Topics(){

    const [topics, setTopics] = useState([]);
    const [counts, setCounts] = useState({})

    useEffect(()=>{
        getAllTopics().then((data) =>{

            setTopics(data)
        })
        getAllArticles().then(data=>{
            const counters = {} 
            data.forEach(article=>{
                if(!Object.hasOwn(counters, article.topic)){
                    counters[article.topic] = 1
                }else{
                    counters[article.topic] ++
                }
            })
            setCounts(counters)
        })
    }, [])

    return (
        <div className="card-list-container" id="category-list">
            <h2>Topics</h2>
            <ul className="card-list">
                {topics.map(topic=>{
                    return <><TopicsCard topic={topic.slug} info={topic.description} counts={counts[topic.slug]}/>
                    </>
                    
                })}
            </ul>
        </div>
    )
}