const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        name: "Mayk Brito",
        avatar: "https://media-exp1.licdn.com/dms/image/C5603AQE5rMrv9NJT7w/profile-displayphoto-shrink_200_200/0?e=1602720000&v=beta&t=bJUDFeuhLtKVIZ2dK7t75rJ057-GfFHtaRSK9W0Z3Y4",
        whatsapp: "51992131102",
        bio: "Analista de serviços RF na Digitel S/A"        
    }

    classValue = {
        subject: 1,
        cost: "20"
        //o proffy_id vira pelo banco de dados (weekday,time_from,time_to)       
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar os dados inseridos

    //todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //Consultar as clesses de um determinado professor e junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;    
        
    `)
    //console.log(selectClassesAndProffys)

    //o horário que a pessoa trabalha é das 8h até 18h
    //o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado
    //o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_to > "520"
    `)
    //console.log(selectClassesSchedules)

})