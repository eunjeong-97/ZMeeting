// 정규표현식

// 한글체크
export const RegExpKorean = new RegExp(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/)
// 한글 이름 2~4자 이내
export const regExpKoreanName = new RegExp(/^[가-힣]{2,5}$/)
// 영문 이름 2~20자 이내 : 띄어쓰기(\s)가 들어가며 First, Last Name 형식
export const regExpEnglishName = new RegExp(/^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/)

// 5-10자의 영문, 숫자 조합
export const regExpNickName = new RegExp(
  /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,10}$/
)

// 5-20자 영문, 숫자 조합
export const regExpId = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,20}$/)

// 8-16글자의 영대소문자 또는, 숫자, 특수 문자 하나 이상
export const regExpPassword = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/
)
