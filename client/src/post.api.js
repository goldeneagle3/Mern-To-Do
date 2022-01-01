const serverUri = "http://localhost:5000/api/v1/posts"



const createPost = async (credentials,post) => {
  try {
    let response = await fetch(`${serverUri}`,{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify(post)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const list = async () => {
  try {
    let response = await fetch(serverUri,{
      method:'GET',
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const read = async (params,credentials) => {
  try {
    let response = await fetch(`${serverUri}/${params.postId}`,{
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (params,credentials,post) => {
  try {
    let response = await fetch(`${serverUri}/${params.postId}`,{
      method:'PATCH',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify(post)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(`${serverUri}/${params.postId}`,{
      method:'DELETE',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}


export {
  createPost,
  list,
  read,
  update,
  remove
}