const serverUri = "http://localhost:5000/api/v1/users"


const create = async (user) => {
  try {
    let response = await fetch(`${serverUri}/register`,{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const login = async (user) => {
  try {
    let response = await fetch(`${serverUri}/login`,{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}



export {create,login}