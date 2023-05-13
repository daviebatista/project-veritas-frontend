import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "../src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'
import courseService, { CourseType } from "@/services/courseService";

const Search = function () {
    const router = useRouter()
    const searchName: any = router.query.name
    const [searchResult, setSerachResult] = useState<CourseType[]>([])

    const searchCourses = async function    ()  {
        if(typeof searchName === 'string') {
            const response = await courseService.getSearch(searchName)

            setSerachResult(response.data.courses)
        }
    }

    useEffect(()    =>  {
        searchCourses()
    }, [searchName])

    return (
            <>
                <Head>
                    <title>Onebitflix - {searchName}</title>
                    <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
                </Head>
                <main>
                    <HeaderAuth />
                    {searchResult?.map((course)   =>  (
                        <div key={course.id}>
                            <p>{course.name} </p>
                        </div>
                    ))}
                </main>
            </>
    )
}

export default Search