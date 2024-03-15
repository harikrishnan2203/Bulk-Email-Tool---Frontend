import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { emailverify } from '../Utils/axios'


function EmailVerify() {

    const {id} = useParams()
    console.log(id)
    const navigate = useNavigate()

    useEffect(() => {
        window.alert("1")
        emailverify(id).then((res) => {
            console.log(res)
            if (res.status === 200) {
                console.log(res.status)
                navigate('/')
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }, [])
  return (
    <Container>
        <h3>Email Verify</h3>
    </Container>
  )
}

export default EmailVerify
