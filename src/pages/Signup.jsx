import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import SignupInput from '../components/SignupInput'

import {
  RegExpKorean,
  regExpKoreanName,
  regExpEnglishName,
  regExpNickName,
  regExpId,
  regExpPassword,
} from '../config/handleRegExp'

const Signup = () => {
  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()
  const todayDate = `${year}-${month}-${date}`

  const navigate = useNavigate()
  const mounted = useRef(false)
  const profileInput = useRef()

  // 회원정보
  let [profileImageURL, setProfileImageURL] = useState(
    process.env.PUBLIC_URL + '/basicProfileImage.jpeg'
  )
  let [nameValue, setNameValue] = useState()
  let [nickNameValue, setNickNameValue] = useState()
  let [idValue, setIdValue] = useState()
  let [passwordValue, setPasswordValue] = useState()
  let [rePasswordValue, setRePasswordValue] = useState()
  let [birthValue, setBirthValue] = useState(todayDate)
  let [genderValue, setGenderValue] = useState('선택안함')
  let [genderIndex, setGenderIndex] = useState(0)

  // 유효성검사
  let [isValidName, setIsValidName] = useState(true)
  let [isValidNickName, setIsValidNickName] = useState(true)
  let [isValidId, setIsValidId] = useState(true)
  let [isValidPassword, setIsValidPassword] = useState(true)
  let [isValidRePassword, setIsValidRePassword] = useState(true)
  let [isValidBirth, setIsValidBirth] = useState(true)

  let [isDisabledButton, setIsDisabledButton] = useState(true)

  const readImage = input => {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
      // 이미지 파일인지 검사 (생략)
      // FileReader 인스턴스 생성
      const reader = new FileReader()
      // 이미지가 로드가 된 경우
      reader.onload = e => setProfileImageURL(e.target.result)
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.files[0])
    }
  }

  // 회원가입 From 보여지는 값
  const signupInputArray = [
    {
      label: '이름',
      id: 'name',
      maxLength: '20',
      isValid: isValidName,
      required: true,
      onChange: e => setNameValue(e.target.value),
      errorMessage: '2~5자의 한글 또는 2~20자의 영어이름만 사용 가능합니다.',
    },
    {
      label: '닉네임',
      id: 'nickName',
      maxLength: '10',
      isValid: isValidNickName,
      required: true,
      onChange: e => setNickNameValue(e.target.value),
      errorMessage: '5~10자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
    {
      label: '아이디',
      id: 'id',
      onChange: e => setIdValue(e.target.value),
      isValid: isValidId,
      required: true,
      errorMessage: '5~20자의 영문 소문자, 숫자만 사용 가능합니다.',
    },
    {
      label: '비밀번호',
      id: 'password',
      type: 'password',
      required: true,
      onChange: e => setPasswordValue(e.target.value),
      isValid: isValidPassword,
      errorMessage: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
    },
    {
      label: '비밀번호 재확인',
      id: 'rePassword',
      type: 'password',
      required: true,
      isValid: isValidRePassword,
      onChange: e => setRePasswordValue(e.target.value),
      errorMessage: '비밀번호가 일치하지 않습니다.',
    },
    {
      label: '생년월일',
      id: 'birth',
      type: 'date',
      isValid: isValidBirth,
      onChange: e => setBirthValue(e.target.value),
      errorMessage: '생년월일을 다시 한번 확인해주세요.',
      value: birthValue,
    },
  ]

  const genderArray = ['선택안함', '남성', '여성']

  // ====유효성검사====
  // 이름
  useEffect(() => {
    if (nameValue === undefined) setIsValidName(true)
    else {
      if (RegExpKorean.test(nameValue)) {
        // 한글이름인 경우
        if (regExpKoreanName.test(nameValue)) setIsValidName(true)
        else setIsValidName(false)
      }
      // 영어이름인 경우
      else {
        if (regExpEnglishName.test(nameValue)) setIsValidName(true)
        else setIsValidName(false)
      }
    }
  }, [nameValue])

  // 닉네임
  useEffect(() => {
    if (nickNameValue === undefined) setIsValidNickName(true)
    else {
      if (!regExpNickName.test(nickNameValue)) setIsValidNickName(false)
      else setIsValidNickName(true)
    }
  }, [nickNameValue])

  // 아이디
  useEffect(() => {
    if (idValue === undefined) setIsValidId(true)
    else {
      if (!regExpId.test(idValue)) setIsValidId(false)
      else setIsValidId(true)
    }
  }, [idValue])

  // 비밀번호
  useEffect(() => {
    if (passwordValue === undefined) setIsValidPassword(true)
    else {
      if (!regExpPassword.test(passwordValue)) setIsValidPassword(false)
      else setIsValidPassword(true)
    }
  }, [passwordValue])

  // 비밀번호 재확인
  useEffect(() => {
    if (rePasswordValue === undefined) setIsValidRePassword(true)
    else {
      if (passwordValue === rePasswordValue) setIsValidRePassword(true)
      else setIsValidRePassword(false)
    }
  }, [passwordValue, rePasswordValue])

  // 생년월일
  useEffect(() => {
    if (!mounted.current) mounted.current = true
    else {
      if (birthValue === todayDate) setIsValidBirth(false)
      else setIsValidBirth(true)
    }
  }, [birthValue, todayDate])

  // 성별선택
  useEffect(() => {
    if (genderIndex === 0) setGenderValue('선택안함')
    if (genderIndex === 1) setGenderValue('남성')
    if (genderIndex === 2) setGenderValue('여성')
  }, [genderIndex, setGenderValue])

  // 전송버튼 활성화 및 비활성화
  useEffect(() => {
    const checkUndefined =
      (nameValue &&
        nickNameValue &&
        idValue &&
        passwordValue &&
        rePasswordValue) !== undefined
    const checkInputValid =
      (isValidName &&
        isValidNickName &&
        isValidId &&
        isValidPassword &&
        isValidRePassword) !== false
    if (checkUndefined && checkInputValid) setIsDisabledButton(false)
    else setIsDisabledButton(true)
  }, [
    isValidName,
    isValidNickName,
    isValidId,
    isValidPassword,
    isValidRePassword,
    nameValue,
    nickNameValue,
    idValue,
    passwordValue,
    rePasswordValue,
    isDisabledButton,
  ])

  // 서버에 데이터 전송
  const sendSignup = () => {
    alert('서버 데이터 전송')
    navigate('/')
    // axios
    //   .post(URL, {
    //     profileImage: profileImageURL,
    //     nickName: nickNameValue,
    //     name: nameValue,
    //     id: idValue,
    //     password: passwordValue,
    //     birthDay: birthValue,
    //     gender: genderValue,
    //   })
    //   .then(response => {
    //     if (response.MESSAGE === 'CREATE') {
    //       alert(`${nameValue}님 가입을 환영합니다.`)
    //       navigate('/')
    //     } else alert('조건에 맞게 기입해주세요.')
    //   })
  }

  return (
    <div className="Signup">
      <div className="logo">문어게임</div>
      <form className="container">
        <div className="profile_image">
          <img src={profileImageURL} alt="profile_image" ref={profileInput} />
          <input
            type="file"
            accept="image/*"
            onChange={e => readImage(e.target)}
          />
        </div>
        {signupInputArray.map((signupItem, signupIndex) => {
          return <SignupInput signupItem={signupItem} key={signupIndex} />
        })}
        <h6 className="contents_title">
          <label htmlFor="gender">성별</label>
        </h6>
        <select onChange={e => setGenderIndex(e.target.selectedIndex)}>
          {genderArray.map((genderItem, genderItemIndex) => {
            return <option key={genderItemIndex}>{genderItem}</option>
          })}
        </select>
        <button
          className="submit_button"
          disabled={isDisabledButton}
          onClick={sendSignup}
        >
          가입하기
        </button>
      </form>
    </div>
  )
}

export default Signup
