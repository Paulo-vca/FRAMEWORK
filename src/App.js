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

        const [posts, photos, albums] = await Promise.all([
            postsResponse,
            photosResponse,
            albumsResponse
        ])

        const postsJson = await posts.json()
        const photosJson = await photos.json()
        const albumsJson = await albums.json();

        // Array para armazenar os posts e fotos
        const photosAndPostsAndAlbum = postsJson.map((post, index) => {
            return {
                ...post,
                albumId: albumsJson[index].id,
                cover: photosJson[index].url
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
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }
}

export default App
