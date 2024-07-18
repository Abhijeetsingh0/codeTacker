'use client'

const loading = ({message}) => {
    if(!message){
        message="loading ...."
    }
    return(
        <div className="grid justify-items-center">
            <img className="w-64 m-8" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2JqeHZlNmhqb2VuenIzYzZzM2d3c2gzbW5nNTM1eXptNDFvNXZkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/B2vBunhgt9Pc4/giphy.webp"></img>
            <p>{message}</p>
        </div>
    )
}

export default loading