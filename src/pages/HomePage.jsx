import { useEffect } from "react"
import { httpService } from "../services/http.service"

export function HomePage() {

    useEffect(() => {
        getHello()
    }, [])

    async function getHello() {
        const hello = await httpService.get('hello')
        console.log(hello)
    }

    return (
        <section className="home">
            <h1>Home sweet Home</h1>
        </section>
    )
}