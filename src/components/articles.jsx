import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllArticles } from "../api/api";
import ArticleCard from "./article-card";
import Filter from "./filter";

export default function Articles(){
    const [articles, setArticles] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    let params = undefined;
    if(searchParams.get('topic')){
        params = {params:{topic: searchParams.get('topic')}}
    }

    useEffect(() =>{
        getAllArticles(params).then(data=>{
            setArticles(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <div className='card-list-container' id='item-list'>
            <h2>Articles</h2>
            <div>
                <Filter setArticles={setArticles}/>
            </div>
            <ul className="card-list">
                {articles.map(article=>{
                    return <ArticleCard article={article}/>
                })}
            </ul>

        </div>
    )

}