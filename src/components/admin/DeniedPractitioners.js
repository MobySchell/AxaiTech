export default class DeniedPractitioners {
    static fromFB(doc) {
        const deniedPractitioners = new DeniedPractitioners("");

        const data = doc.data();
        deniedPractitioners.id = doc.id;
        deniedPractitioners.userId = data.userId;
        deniedPractitioners.userEmail = data.email;
        deniedPractitioners.firstName = data.firstName;
        deniedPractitioners.surName = data.surname;
        deniedPractitioners.hpcsa = data.hpcsa;
        deniedPractitioners.practiceNum = data.practiceNum;
        deniedPractitioners.status = data.status;
        deniedPractitioners.denyMessage = data.denyMessage;

        return deniedPractitioners;
    }
}
