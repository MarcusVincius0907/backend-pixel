
export function validateEmail (email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function minLength(value: any, size: number){
  return String(value).length >= size;
}

export function maxLength(value: any, size: number){
  return String(value).length <= size;
}

export function required(value: any){
  return !!value; 
}