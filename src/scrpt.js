document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const body = document.getElementById('body').value;

    axios.post('/blogposts', {
        title: title,
        author: author,
        body: body
    }).then(function(response) {
        console.log(response);
        loadPosts();  // Reload posts after submission
    }).catch(function(error) {
        console.error('Error posting:', error);
    });
});

function loadPosts() {
    axios.get('/blogposts')
        .then(function(response) {
            const posts = response.data;
            const postsContainer = document.getElementById('postsContainer');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><small>Author: ${post.author}</small>`;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(function(error) {
            console.error('Error loading posts:', error);
        });
}

// Load posts on initial load
loadPosts();
