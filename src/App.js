import './App.css'
import { render } from '@testing-library/react'
import { Component } from 'react'

class App extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        this.loadPosts()
    }

    loadPosts = async () => {
        const postsResponse = fetch(
            'https://jsonplaceholder.typicode.com/posts'
        )

        const photosResponse = fetch(
            'https://jsonplaceholder.typicode.com/photos'
        )
        const albumsResponse = fetch(
            'https://jsonplaceholder.typicode.com/albums'
        )
        const backResponse = fetch('http://localhost:3000/api');


        const [posts, photos, albums, back] = await Promise.all([
            postsResponse,
            photosResponse,
            albumsResponse
        ])

        const postsJson = await posts.json()
        const photosJson = await photos.json()
        const albumsJson = await albums.json();
        const backJson = await back.json();

        // Array para armazenar os posts e fotos
        const photosAndPostsAndAlbum = postsJson.map((post, index) => {
            return {
                ...post,
                albumId: albumsJson[index].id,
                cover: photosJson[index].url,
                back: backJson[index]
            }
        })

        this.setState({ posts: photosAndPostsAndAlbum })
    }

    render() {
        const { posts } = this.state

        return (
            <section className="container">
                <div className="posts">
                    {posts.map(post => (
                        <div key={post.id} className="post">
                            <img src={post.cover} alt="" />
                            <div className="text">
                                <h1>{post.title}</h1>
                                <h3>{post.body}</h3>
                                <p>Album: {post.albumId}</p>
                                <p>back: {post.back}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

export default App
