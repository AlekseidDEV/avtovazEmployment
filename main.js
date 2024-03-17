const emploumentBlock = document.querySelector('.form')
const table = document.querySelector('.consisting_worker tbody')
const descriptionWorker = document.querySelector('.block_description_worker')
const fieldText = descriptionWorker.querySelector('.field_text')

let newWorker = []

class Worker {
    constructor(firstName, lastName, phone, dataBirth){
        this._firstName = firstName
        this._lastName = lastName
        this._phone = phone
        this._dataBirth = dataBirth
    }

    get firstName(){
        return this._firstName
    }

    set firstName(strValue){
        this._firstName = strValue
    }

    get lastName(){
        return this._lastName
    }

    set lastName(strValue){
        this._lastName = strValue
    }

    get phone(){
        return this._phone
    }

    set phone(strValue){
        this._phone = strValue
    }

    get dataBirth(){
        return this._dataBirth
    }

    set dataBirth(strValue){
        this._dataBirth = strValue
    }

    sayHello(descBlock){
        const paragraph = document.createElement('p')

        paragraph.textContent = `- Привет, меня зовут ${this.firstName} ${this.lastName}, я работаю на заводе Автоваз. Контактный телефон ${this.phone}, Дата рождения ${this.dataBirth}`
        descBlock.append(paragraph)
    }

    deleteWorker(index, tr){
        newWorker.splice(index, 1)
        renderTable(newWorker)
        setData(newWorker)
        if(tr.getAttribute('id')){
            descriptionWorker.style.display = 'none'
        }
    }
}

class Ingineer extends Worker {
    constructor(firstName, lastName, phone, dataBirth, jobTitle, salary, responsibility = []){
       super(firstName, lastName, phone, dataBirth)
       this._salary = salary
       this._responsibility = responsibility
       this._jobTitle = jobTitle
    }

    get salary(){
        return this._salary
    }

    set salary(numValue){
        this._salary = numValue
    }

    get responsibility(){
        return this._firstName
    }

    set responsibility(strValue){
        this._responsibility = strValue
    }

    get jobTitle(){
        return this._jobTitle
    }

    set jobTitle(strValue){
        this._jobTitle = strValue
    }

    jobProcess(descBlock){
        const paragraph = document.createElement('p')

        paragraph.textContent = `- Я занимаюсь проектированием новых тарантаек, надеюсь они будут ездить хотя бы`
        descBlock.append(paragraph)
    }
}

class Electrician extends Worker {
    constructor(firstName, lastName, phone, dataBirth, jobTitle, salary, responsibility = []){
        super(firstName, lastName, phone, dataBirth)
        this._salary = salary
        this._responsibility = responsibility
        this._jobTitle = jobTitle
     }
 
     get salary(){
         return this._salary
     }
 
     set salary(numValue){
         this._salary = numValue
     }
 
     get responsibility(){
         return this._responsibility
     }
 
     set responsibility(arr){
         this._responsibility = arr
     }

     get jobTitle(){
        return this._jobTitle
    }

    set jobTitle(strValue){
        this._jobTitle = strValue
    }
 
     jobProcess(descBlock){
         const paragraph = document.createElement('p')

         paragraph.textContent = `- Я прокладываю проводку в машинах, так прокладываю, что потом не разберешься,  что где подключено`
         descBlock.append(paragraph)
     }
}

class Marketer extends Worker {
    constructor(firstName, lastName, phone, dataBirth, jobTitle, salary, responsibility = []){
        super(firstName, lastName, phone, dataBirth)
        this._salary = salary
        this._responsibility = responsibility
        this._jobTitle = jobTitle
     }
 
     get salary(){
         return this._salary
     }
 
     set salary(numValue){
         this._salary = numValue
     }
 
     get responsibility(){
         return this._firstName
     }
 
     set responsibility(strValue){
         this._responsibility = strValue
     }

     get jobTitle(){
        return this._jobTitle
    }

    set jobTitle(strValue){
        this._jobTitle = strValue
    }
 
     jobProcess(descBlock){
         const paragraph = document.createElement('p')

         paragraph.textContent = `- Я пытаюсь продавать ведра, собираемые на этом заводе. ПАМАГИТЕ!`
         descBlock.append(paragraph)
     }
}

const arrIngineer = [115000, ['проектирование автомобилей', 'совершенствование существующих автомобилей', 'тестирование']]
const arrElectrician = [70000, ['проводка автомобиля', 'проверка проложенной проводки']]
const arrMarketer = [95000, ['продажа автомибилей', "привлечение клиентов" ,"реклама"]]

const setData = (data) => {
    const jsonData = JSON.stringify(data)
    localStorage.setItem('workers', jsonData)
}

const renderTable = (wokerArr) => {
    table.innerHTML = ''

    wokerArr.forEach((obj, index) => {
        table.insertAdjacentHTML('beforeend', `
            <tr data-jobindex ="${index + 1}" class="header_tr">
                <td>${obj._firstName}</td>
                <td>${obj._lastName}</td>
                <td>${obj._phone}</td>
                <td>${obj._dataBirth}</td>
                <td>${obj._salary}</td>
                <td>${obj._jobTitle}</td>
                <td>${obj._responsibility.join(', ')}</td>
                <td><button id="desc">подробнее</button><button id="del">Удалить</button></td>
            </tr>
        `)
    })
}

const getData = () => {
    const getData = localStorage.getItem('workers')
    const dataParse = JSON.parse(getData) || []

    dataParse.forEach((obj) => {
        if(obj._jobTitle === 'Инженер'){
            newWorker.push(Object.assign(new Ingineer(), obj))
        } else if(obj._jobTitle === 'Электрик'){
            newWorker.push(Object.assign(new Electrician(), obj))
        } else if(obj._jobTitle === 'Маркетолог'){
            newWorker.push(Object.assign(new Marketer(), obj))
        }
    })

    renderTable(newWorker)
}

const createWorker = (data, selectText) => {
    if(data.selectJob === '1'){
        newWorker.push(new Ingineer(data.firstName, data.lastName, data.phone, data.dataBirth, selectText, arrIngineer[0], arrIngineer[1]))
    } else if(data.selectJob === '2'){
        newWorker.push(new Electrician(data.firstName, data.lastName, data.phone, data.dataBirth, selectText, arrElectrician[0], arrElectrician[1]))
    } else if(data.selectJob === '3'){
        newWorker.push(new Marketer(data.firstName, data.lastName, data.phone, data.dataBirth, selectText, arrMarketer[0], arrMarketer[1]))
    }

    renderTable(newWorker)
    setData(newWorker)
}

const validateForm = (inputs, select) => {
    let succes = false

    Array.from(inputs).every((input) => {
        if(input.value === ''){
            succes = false
        } else{
            succes = true
        }
    })

    if(select.value === ''){
        succes = false
    } else{
        succes = true
    }

    return succes
}

const dataPreporation = (form) => {
    const allInputs = form.querySelectorAll('input')
    const select = form.querySelector('select')

    const formData = new FormData(form)
    const bodyForm = {}

    formData.forEach((value, key) => {
        bodyForm[key] = value
    })

    bodyForm.selectJob = select.value

    if(validateForm(allInputs, select)){
        createWorker(bodyForm, select.options[select.selectedIndex].textContent)
        allInputs.forEach((input) => {
            input.value = ''
            select.value = ''
        })
    } else{
        alert('заполните поля!')
    }
}

const openDescBlock = (index, targetTr) => {
        const trs = table.querySelectorAll('tr')

        trs.forEach((tr) => {
            if(tr.getAttribute('id')){
                tr.removeAttribute('id')
            }
        })
        targetTr.setAttribute('id', 'opened_desc')
    
        descriptionWorker.style.display = 'block'
        fieldText.innerHTML = ''
    
        newWorker[index - 1].sayHello(fieldText)
        newWorker[index - 1].jobProcess(fieldText)
}

getData()

emploumentBlock.addEventListener('submit', (e) => {
    e.preventDefault()
    dataPreporation(e.target)
})

table.addEventListener('click', (e) => {
    if(e.target.id === 'desc'){
        openDescBlock(e.target.closest('tr').dataset['jobindex'], e.target.closest('tr'))
    } else if(e.target.id === 'del'){
        Worker.prototype.deleteWorker(+e.target.closest('tr').dataset['jobindex'] - 1, e.target.closest('tr'))
    }
})




