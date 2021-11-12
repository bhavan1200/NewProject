import React from 'react'
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux'


const postList = () => {
const posts = useSelector(state => state.posts);

const renderedPosts = posts.map(post => (
    <View className="post-excerpt" key={post.id}>
      <Text>{post.title}</Text>
      <Text>{post.content.substring(0, 100)}</Text>
    </View>
  ))

    return (
        <View>
            <Text>Posts</Text>
            {renderedPosts}
        </View>
    )
}

export default postList;
