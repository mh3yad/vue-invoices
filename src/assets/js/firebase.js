import firebase from "firebase"
import { onUnmounted,ref } from "vue";
const firebaseConfig = {
    apiKey: "AIzaSyD_WeiWNMB7aYZNJ9cuU9ApiISR9kwn_RI",
    authDomain: "test-47472.firebaseapp.com",
    databaseURL: "https://test-47472-default-rtdb.firebaseio.com",
    projectId: "test-47472",
    storageBucket: "test-47472.appspot.com",
    messagingSenderId: "390608881674",
    appId: "1:390608881674:web:2415a8d0154f972dc637f3",
    measurementId: "G-WHT1Z0QD2X"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export const InvoicesCollection = db.collection("Invoices")
export const createInvoice = (idd,invoice) => {
      return InvoicesCollection.doc(idd).set(invoice)
}
export const getInvoice = async id => {
  const user = await InvoicesCollection.doc(id).get()
  return user.exists ? user.data() : null;
}

export const updateInvoice = (id,invoice) => {
  return InvoicesCollection.doc(id).update(invoice)
}
export const deleteInvoice = id => {
  return InvoicesCollection.doc(id).delete()
}
export const submitGetAllWithcondition = async id => {
  const invoice = await InvoicesCollection.where("_value.id", "==", "v").get()
  return invoice.exists ? invoice.data() : null;
}

export const allInvoices = () => {
  const invoices  = ref([])
  const close = InvoicesCollection.onSnapshot((snapshot) => {
      invoices.value = snapshot.docs.map(doc => ({id:doc.id,...doc.data()}))
  });
  onUnmounted(close)
  return invoices
}

export default firebase