import React, { useEffect } from 'react'
import HeaderSection from './HeaderSection'
import FootSection from './FootSection'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

// const fetchers = async (url) => {
//     const response = await fetch(url)
//     const data = await response.json()
//     if (routeName === "") {
//         return data
//     }
//     else {
//         const filtered = data.filter(item => item.CreativeField_2 === routeName)
//         return filtered
//     }
//     console.log(data)
// }

function Results({ routeName }) {
    const [res, setRes] = React.useState([])
    const { data, isLoading, error } = useSWR('https://script.google.com/macros/s/AKfycbzINxQhoCg4CuhsOWjN4ZeSn3sE7dCSTh90Fy0LCQKiJC7RdFHa9oAzQ3kJ8YYKl7oX7Q/exec', fetcher)
    const searchParams = new URLSearchParams(window.location.search)
    const [loader, setLoader] = React.useState(false)

    if (error) return <div className='w-full h-screen flex justify-center py-4 bg-[#EFEFEF]'>failed to load</div>
    if (isLoading) return (
        <>
            <HeaderSection routeN={routeName} loading={true} />
            <div className='w-full h-screen flex justify-center py-4 text-5xl font-bold bg-[#EFEFEF]'>
                loading
                <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton bg-slate-400 h-32 w-full"></div>
                    <div className="skeleton bg-slate-400 h-4 w-28"></div>
                    <div className="skeleton bg-slate-400 h-4 w-full"></div>
                    <div className="skeleton bg-slate-400 h-4 w-full"></div>
                </div>
            </div>
        </>
    )


    if (routeName === "") return (
        <div>
            <HeaderSection routeN={routeName} loading={false} />
            <div className='w-full h-auto flex justify-center py-4 bg-[#EFEFEF]'>
                <div className='w-[90%] h-full lg:flex md:block gap-2 '>
                    <div className='w-[30%] flex lg:flex-col md:flex-row gap-4 mr-4 pt-4'>


                        {routeName === "Audiovisual Media" && <h1 className='whitespace-normal text-4xl text-end'>AudioVisual <br /> <strong>Media</strong></h1>}
                        {routeName === "Visual Arts" && <h1 className='whitespace-normal text-4xl text-end'>Visual <br /> <strong>Arts</strong></h1>}
                        {routeName === "Creative Services" && <h1 className='whitespace-normal text-4xl text-end'>Creative <br /> <strong>Services</strong></h1>}
                        {routeName === "Digital Interactive Media" && <h1 className='whitespace-normal text-4xl text-end'>Digital Interactive <br /> <strong>Media</strong></h1>}
                        {routeName === "Design" && <h1 className='whitespace-normal text-4xl text-end'> <br /> <strong>Design</strong></h1>}
                        {routeName === "Performing Arts" && <h1 className='whitespace-normal text-4xl text-end'>Performing <br /> <strong>Arts</strong></h1>}
                        {routeName === "Cultural Arts" && <h1 className='whitespace-normal text-4xl text-end'>Cultural <br /> <strong>Arts</strong></h1>}
                        {routeName === "" && <h1 className='whitespace-normal text-4xl text-end'>All <br /> <strong>Results for "{searchParams.get('search')}"</strong></h1>}
                        <a className='flex self-end' href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </div>
                    <div className='w-[70%] grid gap-4 lg:grid-cols-2 md:grid-cols-1 grid-rows-2 mt-10'>

                        {data.filter(data => (data.FirstName + data.LastName).includes(searchParams.get('search'))).map((item, i) => {
                            return (
                                <div className='card lg:w-[80%] md:w-full flex bg-white rounded-2xl flex-col justify-center items-center p-4' key={i}>
                                    <img loading='lazy' src={item.profilephoto} className='mask mask-circle mb-4 object-cover self-center w-36 h-36' alt={i} />
                                    <h1 className='card-title'>{item.FirstName} {item.LastName}</h1>
                                    <div className='card-body'>
                                        <p>{item.shortbio}</p>
                                        <p>{item.Location_2}</p>
                                        <h1>{item.MobileNumber}</h1>
                                        <h1>{item.EmailAddress}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.Facebook !== "" && (<a href={item.Facebook} target="_blank"><img src="/facebooklogo.png" alt="fblogo" /></a>)}
                                        {item.instagramlink !== "" && (<a href={item.instagramlink} target="_blank"><img src="/instagramlogo.png" alt="fblogo" /></a>)}
                                        {item.Behance !== "" && (<a href={item.Behance} target="_blank"><img src="/behancelogo.svg" alt="fblogo" /></a>)}
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>

            </div>
            <FootSection />
        </div>
    )

    if (data.filter(data => data.CreativeField_2 === routeName).length === 0) return (
        <>
            <HeaderSection routeN={routeName} loading={false} />
            <div className='w-full h-screen p-10 justify-center py-4 text-5xl font-bold bg-[#EFEFEF]'>
                No results
                <div className="flex flex-col gap-4 w-full p-10 mt-10">
                    <div className="skeleton bg-slate-400 h-4 w-28"></div>
                    <div className="skeleton bg-slate-400 h-4 w-full"></div>
                    <div className="skeleton bg-slate-400 h-4 w-full"></div>
                </div>
                <a className='flex self-end' href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
            </div>
            <FootSection />
        </>
    )




    if (data.filter(data => data.CreativeField_2 === routeName).length !== 0) return (
        <div>
            <HeaderSection routeN={routeName} loading={false} />
            <div className='w-full h-auto flex justify-center py-4 bg-[#EFEFEF]'>
                <div className='w-[90%] h-full lg:flex md:block gap-2 '>
                    <div className='w-[30%] flex lg:flex-col md:flex-row gap-4 mr-4 pt-4'>

                        {routeName === "Audiovisual Media" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>AudioVisual <br /> <strong>Media</strong></h1>)
                            : routeName === "Audiovisual Media" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in AudioVisual Media</strong></h1>)
                                : null}

                        {routeName === "Visual Arts" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Visual <br /> <strong>Arts</strong></h1>)
                            : routeName === "Visual Arts" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Visual Arts</strong></h1>)
                                : null}

                        {routeName === "Creative Services" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Creative <br /> <strong>Services</strong></h1>)
                            : routeName === "Creative Services" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Creative Services</strong></h1>)
                                : null}

                        {routeName === "Digital Interactive Media" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Digital Interactive <br /> <strong>Media</strong></h1>)
                            : routeName === "Digital Interactive Media" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Digital Interactive Media</strong></h1>)
                                : null}

                        {routeName === "Design" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'> <br /> <strong>Design</strong></h1>)
                            : routeName === "Design" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Design</strong></h1>)
                                : null}

                        {routeName === "Performing Arts" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Performing <br /> <strong>Arts</strong></h1>)
                            : routeName === "Performing Arts" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Performing Arts</strong></h1>)
                                : null}

                        {routeName === "Cultural Arts" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Cultural <br /> <strong>Arts</strong></h1>)
                            : routeName === "Cultural Arts" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Cultural Arts</strong></h1>)
                                : null}

                        {routeName === "Publishing and Printed Media" && searchParams.get('search') === null
                            ? (<h1 className='whitespace-normal text-4xl text-end'>Publishing and<br /><strong>Printed Media</strong></h1>)
                            : routeName === "Publishing and Printed Media" && searchParams.get('search')
                                ? (<h1 className='whitespace-normal text-4xl text-end'>Search results for {searchParams.get('search')} <br /> <strong>in Publishing and Printed Media</strong></h1>)
                                : null}

                        <a className='flex self-end' href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </div>
                    <div className='w-[70%] grid gap-4 lg:grid-cols-2 md:grid-cols-1 grid-rows-2 mt-10'>

                        {routeName === "" && data.map((item, i) => {
                            return (
                                <div className='card lg:w-[80%] md:w-full flex bg-white rounded-2xl flex-col justify-center items-center p-4' key={i}>
                                    <img loading='lazy' src={item.profilephoto} className='mask mask-circle mb-4 object-cover self-center w-36 h-36' alt={i} />
                                    <h1 className='card-title'>{item.FirstName} {item.LastName}</h1>
                                    <div className='card-body'>
                                        <p>{item.shortbio}</p>
                                        <p>{item.Location_2}</p>
                                        <h1>{item.MobileNumber}</h1>
                                        <h1>{item.EmailAddress}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.Facebook !== "" && (<a href={item.Facebook} target="_blank"><img src="/facebooklogo.png" alt="fblogo" /></a>)}
                                        {item.instagramlink !== "" && (<a href={item.instagramlink} target="_blank"><img src="/instagramlogo.png" alt="fblogo" /></a>)}
                                        {item.Behance !== "" && (<a href={item.Behance} target="_blank"><img src="/behancelogo.svg" alt="fblogo" /></a>)}
                                    </div>
                                </div>
                            )
                        })}
                        {routeName !== "" && searchParams.get('search') === null ? data.filter(data => data.CreativeField_2 === routeName).map((items, i) => {
                            return (
                                <div className='card lg:w-[80%] md:w-full flex bg-white rounded-2xl flex-col justify-center items-center p-4' key={i}>
                                    <img loading='lazy' src={items.profilephoto} className='mask mask-circle mb-4 object-cover self-center w-36 h-36' alt={i} />
                                    <h1 className='card-title'>{items.FirstName} {items.LastName}</h1>
                                    <div className='card-body'>
                                        <p>{items.shortbio}</p>
                                        <p>{items.Location_2}</p>
                                        <h1>{items.MobileNumber}</h1>
                                        <h1>{items.EmailAddress}</h1>
                                        {console.log(searchParams.get('search'))}
                                    </div>
                                    <div className="flex gap-2">
                                        {items.Facebook !== "" && (<a href={items.Facebook} target="_blank"><img src="/facebooklogo.png" alt="fblogo" /></a>)}
                                        {items.instagramlink !== "" && (<a href={items.instagramlink} target="_blank"><img src="/instagramlogo.png" alt="fblogo" /></a>)}
                                        {items.Behance !== "" && (<a href={items.Behance} target="_blank"><img src="/behancelogo.svg" alt="fblogo" /></a>)}
                                    </div>
                                </div>
                            )
                        }) : null}
                        {routeName !== "" && searchParams.get('search') !== null ? data.filter(data => data.CreativeField_2 === routeName).filter(data => (data.FirstName + data.LastName).includes(searchParams.get('search'))).map((items, i) => {
                            return (
                                <div className='card lg:w-[80%] md:w-full flex bg-white rounded-2xl flex-col justify-center items-center p-4' key={i}>
                                    <img loading='lazy' src={items.profilephoto} className='mask mask-circle mb-4 object-cover self-center w-36 h-36' alt={i} />
                                    <h1 className='card-title'>{items.FirstName} {items.LastName}</h1>
                                    <div className='card-body'>
                                        <p>{items.shortbio}</p>
                                        <p>{items.Location_2}</p>
                                        <h1>{items.MobileNumber}</h1>
                                        <h1>{items.EmailAddress}</h1>
                                        {console.log(searchParams.get('search'))}
                                    </div>
                                    <div className="flex gap-2">
                                        {items.Facebook !== "" && (<a href={items.Facebook} target="_blank"><img src="/facebooklogo.png" alt="fblogo" /></a>)}
                                        {items.instagramlink !== "" && (<a href={items.instagramlink} target="_blank"><img src="/instagramlogo.png" alt="fblogo" /></a>)}
                                        {items.Behance !== "" && (<a href={items.Behance} target="_blank"><img src="/behancelogo.svg" alt="fblogo" /></a>)}
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>

                </div>

            </div>
            <FootSection />
        </div>
    )
}

export default Results