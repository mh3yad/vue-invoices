    <template> 
    <div class="w-75 m-auto  " style="direction:rtl">
       <section class="d-flex  m-auto text-right">
       
        <div class="w-1/2 p-1">
            <p>شركة أولاد بلال</p>
            <p>لتجارة الحبوب والأعلاف و البقوليات</p>
            <p>ادارة الحاج/صبحي بلال</p>
            <p>ت 01008445605</p>
            <p>ت 01066423562</p>
            
        </div>
       <hr>
       
       </section>
       <section class="text-center">
         <p class="text-center">أمر توريد</p>
         <div class="d-flex ">
           <p>اسم العميل: </p>
           <input type="text" class="">
         </div>
         <div class="d-flex">
           <p>اسم العميل: </p>
           <input type="text" class="">
            <p>اسم العميل: </p>
           <input type="text" class="">
         </div>
           <div class="d-flex ">
           <p class="ml-2"> وذلك قيمة البضاعة الموضحة ادناه بعد المعاينة و الاستلام  </p>
           <p class="mr-3 border">تحريرا  في  </p>
           <input type="date">
         </div>
       </section>
      <table class="table">
        <thead>
          <tr>
            <th class="w-1/4 ...">اسم الصنف</th>
            <th class="w-1/4 ...">الوحدة</th>
            <th class="w-1/4 ...">الكمية</th>
            <th class="w-1/4 ...">سعر الوحدة</th>
            <th class="w-1/4 ...">الاجمالي</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,index) in rows" :key="row">
             <td><input type="text" v-model="products[index].name"></td>   
            <td>
                <select class="custom-select custom-select-lg mb-3">
                  <option v-for="unit in products.units" :key="unit" :value="unit">{{unit}}</option>
                </select>
            </td>
            <td><input type="number"  v-model="products[index].quantitiy"></td>
            <td><input type="number"  v-model="products[index].price"></td>
            <td><input type="number" :value=" products[index].price * products[index].quantitiy"></td>
          </tr>
        
         
        </tbody>
      </table>
     <div class="d-flex">
       <button class="text-right" @click="addRow()">Add Row</button>
     </div>

    </div>
</template>


<script>
// @ is an alias to /src
import {createInvoice,allInvoices,getInvoice,deleteInvoice,getAllWithCondition,InvoicesCollection} from "@/assets/js/firebase"
import {ref,computed} from "vue"
export default {
  name: 'Home',
  setup(){
    let rows = ref(1)
    const products = Array(50).fill({
        name:"",
        units:["شيكارة","طن","كيلو"],
        quantitiy:"1",
        price:"1",
        total:"1"
    })
    const total = computed(() => {products.price * products.total })
    console.log(products[0].name)
    const invoice = ref({name:"",id:""})
    const selectedInvoice = ref("as")
    const  submitCreateInvoice = async () => {
      await createInvoice(invoice.value.name,{...invoice})
      invoice.name = ""
      invoice.id = ""
    } 
    const    invoices  =  allInvoices()
    const submitGetInvoice = async () => {
       selectedInvoice.value =  await getInvoice(selectedInvoice.value)
    }
    const submitDeleteInvoice = async () => {
        await deleteInvoice(selectedInvoice.value)
    }
    const addRow = () => {
     console.log(products[0].name);
    
    //  Object.freeze(products[rows-1])
     rows.value++
    }
   

    return {invoice,submitCreateInvoice,invoices,submitGetInvoice,selectedInvoice,submitDeleteInvoice,rows,addRow,products,total}
  },
  
}
</script>
