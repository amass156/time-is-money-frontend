import React from 'react'

const Register = () => {
    return (
        <div>
            <form>
                <label>
                    Name: <input type="text" name="name" />
                </label>

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

export default Register
