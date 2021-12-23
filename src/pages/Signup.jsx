import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import SignupInput from '../components/SignupInput'

const Signup = () => {
  const navigate = useNavigate()
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  const todayDate = `${year}-${month}-${date}`

  // 5-20글자의 영소문자 또는 숫자
  const regExpId = new RegExp(/^[a-z]+[a-z0-9]{4,19}&/)
  // 8-16글자의 영대소문자 또는, 숫자, 특수 문자 하나 이상
  const regExpPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/
  )
  // 한글체크
  const RegExpKorean = new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)
  // 한글 이름 2~4자 이내
  const regExpKoreanName = new RegExp(/^[가-힣]{2,4}$/)
  // 영문 이름 2~10자 이내 : 띄어쓰기(\s)가 들어가며 First, Last Name 형식
  const regExpEnglishName = new RegExp(/^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/)

  // 회원정보
  let [idValue, setIdValue] = useState('')
  let [passwordValue, setPasswordValue] = useState('')
  let [rePasswordValue, setRePasswordValue] = useState('')
  let [nameValue, setNameValue] = useState('')
  let [birthValue, setBirthValue] = useState(todayDate)
  let [ageValue, setAgeValue] = useState()

  // 유효성검사
  let [idValid, setIdValid] = useState(true)
  let [passwordValid, setPasswordValid] = useState(true)
  let [rePasswordValid, setRePasswordValid] = useState(true)
  let [nameValid, setNameValid] = useState(true)
  let [birthValid, setBirthValid] = useState(false)

  // 회원가입 From 보여지는 값
  const signupInputArray = [
    {
      label: '아이디',
      id: 'id',
      onChange: e => {
        setIdValue(e.target.value)
        setIdValid(regExpId.test(idValue))
      },
      isValid: idValid,
      errorMessage: '5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
    {
      label: '비밀번호',
      id: 'password',
      type: 'password',
      onChange: e => {
        setPasswordValue(e.target.value)
        setPasswordValid(regExpPassword.test(passwordValue))
      },
      isValid: passwordValid,
      errorMessage: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    },
    {
      label: '비밀번호 재확인',
      id: 'rePassword',
      type: 'password',
      isValid: rePasswordValid,
      onChange: e => {
        setRePasswordValue(e.target.value)
        if (passwordValue === rePasswordValue) {
          setRePasswordValid(true)
        } else setRePasswordValid(false)
      },
      errorMessage: '비밀번호가 일치하지 않습니다.',
    },
    {
      label: '이름',
      id: 'name',
      maxLength: '10',
      isValid: nameValid,
      onChange: e => {
        setNameValue(e.target.value)
        // 한글이름인 경우
        if (RegExpKorean.test(nameValid) && regExpKoreanName.test(nameValid))
          setNameValid(true)
        else if (
          RegExpKorean.test(nameValid) &&
          !regExpKoreanName.test(nameValid)
        )
          setNameValid(false)
        // 영어이름인 경우
        else {
          if (regExpEnglishName.test(nameValid)) setNameValid(true)
          else setNameValid(false)
        }
      },
      errorMessage:
        '10글자 이하의 한글과 영문 대 소문자만 사용 가능합니다. (특수기호, 공백 사용 불가)',
    },
    {
      label: '생년월일',
      id: 'birth',
      type: 'date',
      isValid: birthValid,
      onChange: e => {
        setBirthValue(e.target.value)
        // 5세미만은 유효성오류
        if (ageValue < 5) setBirthValid(false)
        else setBirthValid(true)
      },
      errorMessage: '생년월일을 다시 한번 확인해주세요.',
      value: birthValue,
    },
  ]

  useEffect(() => {
    const birthYear = birthValue.split('-')[0]
    setAgeValue(year - birthYear + 1)
  }, [birthValue, year])

  const sendSignup = () => {
    axios
      .post(URL, {
        id: idValue,
        password: passwordValue,
        rePassword: rePasswordValue,
        name: nameValue,
        birthDay: birthValue,
      })
      .then(response => {
        if (response.MESSAGE === 'CREATE') {
          alert(`${nameValue}님 가입을 환영합니다.`)
          navigate('/')
        } else alert('조건에 맞게 기입해주세요.')
      })
  }

  // ====test=====
  console.log(birthValid)

  return (
    <div className="Signup">
      <div className="logo">문어게임</div>
      <div className="container">
        {signupInputArray.map((signupItem, signupIndex) => {
          return <SignupInput signupItem={signupItem} key={signupIndex} />
        })}
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">선택안함</Dropdown.Item>
          <Dropdown.Item href="#/action-2">남성</Dropdown.Item>
          <Dropdown.Item href="#/action-3">여성</Dropdown.Item>
        </DropdownButton>
      </div>
      <button className="submit" onClick={sendSignup}>
        가입하기
      </button>
    </div>
  )
}

export default Signup
