import { useEffect, useState } from "react";
import { getAllArticles } from "../api/api";

export default function Filter({setArticles}){
    const[sort_by, setSortBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
   

    useEffect(()=>{

        const params = {params:{order}}

        if(sort_by !== "votes"){
            params.params.sort_by = sort_by
        }

        getAllArticles(params)
        .then(data=>{
            const sorted = sort_by === 'votes'? [...data].sort((a,b)=>{
                order === 'asc'? a.votes - b.votes: b.votes - a.votes
            }):data;
            setArticles(sorted);
        })
        .catch(error=>{
            console.log(error)
        })
    }, [sort_by, order])

    const handleSortBy = ({target:{value}})=> setSortBy(value);
    const handleOrder = ({target:{value}}) => setOrder(value);

    const SelectValues = ({value, label, onChange, options}) => (
        <label>
            <select value={value}
                onChange={onChange}
            >
                {options.map(({value, label}) => {
                    return <option key={value} value={value}>
                        {label}
                        </option>
                })}
            </select>
        </label>
    )
    return (
        <div>
            <SelectValues
            label="Sort By"
            value={sort_by}
            onChange={handleSortBy}
            options={[{value: "created_at", label:"Date Posted"},
                    {value:"author", label:"Author"},
                    {value:"title", label:"Title"},
                    {value:"votes", label:"Votes"}
            ]}
            />

            <SelectValues
            label="Order"
            value={order}
            onChange={handleOrder}
            options={[{value:"asc", label:"Ascending"},{value:"desc", label:"Descending"}]}
            />
        </div>
    )

    

}
