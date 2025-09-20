import { useState } from "react";
import "./App.css";
import Search from "./components/Search.jsx";

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async (searchText) => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
        setLoading(true);
        try {
            const response = await fetch(url);
            const wordData = await response.json();
            setData(wordData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    return (
        <div className="p-2 sm:px-10 bg-gray-200 min-h-screen">
            <Search fetchData={fetchData} />
            {
                loading ?
                <h1 className="text-2xl font-bold text-center">Loading...</h1>
                
                :<>
                {data ? (
                <div className="p-4 w-full min-h-32 rounded  morph-shadow mt-4 flex flex-col mx-auto ">
                    <h1 className="font-extrabold capitalize text-3xl text-teal-600">
                        Word:
                        <span className="text-gray-600 font-medium text-2xl">
                            {data[0].word} {data[0].phonetic}
                        </span>
                    </h1>
                    {data[0].phonetics && data[0].phonetics.length ? (
                        <div className="p-2">
                            <strong>Pronounciation:</strong>
                            {data[0].phonetics.map(({ text }, index) => {
                                return (
                                    <span className="p-2" key={index}>
                                        {text}
                                    </span>
                                );
                            })}
                        </div>
                    ) : null}

                    <section className="py-4">
                        {
                            data[0].meanings.length && data[0].meanings.map(
                                ({partOfSpeech,antonyms,synonyms,definitions},index)=>{
                                    return(
                                        <div className=" p-2 morph-shadow my-4" key={index}>
                                            <h1> <strong> {data[0].word} </strong> ({partOfSpeech}) </h1>
                                            <div className="">
                                                <strong>Definations</strong>
                                                {
                                                    definitions.length && definitions.map((item,index)=>(
                                                        <p key={index}>{index+1}. {item.definition}</p>
                                                    ))
                                                }
                                            </div>
                                            {
                                                synonyms.length ?
                                                <p>
                                                    <strong>Synonyms:</strong>
                                                    {
                                                        synonyms.map(item=>(<span key={item} className="px-2 capitalize">{item},</span>)) 
                                                    }
                                                </p>
                                                : null
                                            }
                                            {
                                                antonyms.length ?
                                                <p>
                                                    <strong>Antonyms:</strong>
                                                    {
                                                        antonyms.map(item=>(<span key={item} className="px-2 capitalize">{item},</span>)) 
                                                    }
                                                </p>
                                                : null
                                            }
                                        </div>
                                    )
                                }
                            )
                        }
                    </section>


                    <div>
                        {data[0].sourceUrls && data[0].sourceUrls.length ? (
                            <>
                                <h1>Important Links</h1>
                                {data[0].sourceUrls.map((link, index) => {
                                    return (
                                        <a
                                            className="h-full w-full px-2 py-1 text-blue-500 underline capitalize"
                                            href={link}
                                            key={index}
                                            target="_blank"
                                        >
                                            {
                                                link.split("/")[
                                                    link.split("/").length - 1
                                                ]
                                            }
                                        </a>
                                    );
                                })}
                            </>
                        ) : null}
                    </div>

                </div>
            ) : (
                <p className="text-gray-800 text-center mt-4 text-2xl">
                    Info Not Availble:(
                </p>
            )}
                </>  
            }    

        </div>
    );
}

export default App;
