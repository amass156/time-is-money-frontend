import React from 'react'

const Login = () => {
    return (
        <div>
            <h2> Login </h2>
            <form>
                <label>
                    Username:<input type="text" name="username" />
                </label>

                <label>
                    Password: <input type="text" name="password" />
                </label>
                    <input type="submit" />
            </form>
        </div>
    )
}

export default Login
