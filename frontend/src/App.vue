<script setup>
import {OpenAPI,addNewBooksAddNewBookPost, getAllBookGetBooksGet,readOneReadOnePost,readedBooksReadedBooksGet,searchSearchGet} from "../src/client";

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@iconify/vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Switch } from '@/components/ui/switch'
import { useColorMode } from '@vueuse/core'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {ref,onMounted} from "vue";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

OpenAPI.BASE="http://localhost:8001"

import {Book} from 'lucide-vue-next'

const showModal = ref(false)
const mode = useColorMode() 
const bookName = ref("")
const  bookCategory = ref("")
const bookDescription = ref("")
const fileToSend = ref(null)
const books = ref([])
const state = ref(false)
const query = ref("")
const searchResult = ref([])
const { toast } = useToast()

function handleFileUpload(event){
  fileToSend.value = event.target.files[0]
}

async function searchBook(){
  try{
      const response  = await searchSearchGet({"q":query.value})
      searchResult.value = response
   }catch(e){
      console.log(e)
  }
}

async function readBook(id_of_book,path){
  try{
      await readOneReadOnePost({"id":id_of_book})
  }catch(e){
    console.log(e)
  }
  window.open("http://localhost:8001/"+path)
}

async function getBooks(){
  try{
      const response = await getAllBookGetBooksGet({"start":0,"end":10})
      books.value = response
      console.log(response)
    }catch(e){
    console.log(e)
  }
}

async function handleSwitchState(){
  
  state.value = !state.value

  console.log(state.value)
  if (state.value){
    try{
      const response = await readedBooksReadedBooksGet()
      books.value = response
    }catch(e){
      console.log(e)
    }
  }else{
      await getBooks()
  }  
}

async function addNewBook() {
    const url = "http://0.0.0.0:8001/add-new-book"
    const fullUrl = `${url}?name=${encodeURIComponent(bookName.value)}&category=${encodeURIComponent(bookCategory.value)}&description=${encodeURIComponent(bookDescription.value)}`;
    
    const formData = new FormData();
    formData.append('file', fileToSend.value, fileToSend.value.name);

    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
        },
        body: formData
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    toast({
        title: 'Success',
        description: "The book "+bookName.value+" is added successfuly",
      });
      bookName.value = ""
      bookCategory.value = ""
      bookCategory.value = ""
      await getBooks()
  }

onMounted(async()=>{
  await getBooks()
})
</script>
<template>

  <div class="flex flex-col justify-start items-center">
    <nav class="flex flex-row justify-between items-center shadow-md w-[100%]">
      
      <div class="w-[100px] h-[75px] flex justify-center items-center">
      <h1>Logo</h1>
      </div>
      
      <div class="w-[250px] h-[75px] flex justify-evenly items-center">
      
          <Dialog v-show="showModal">
    <DialogTrigger as-child>
      <Button variant="outline">
        Add 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 m-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
      <CardHeader>
      <CardTitle>Add a new Book</CardTitle>
      <CardDescription>
      Here you can add a new book on your librairies
      </CardDescription>
    </CardHeader> 
      </DialogHeader>
    
        <CardContent class="grid gap-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="area">Book Categories</Label>
             <Select v-model="bookCategory" >
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select Categories" />
    </SelectTrigger>
  <SelectContent>
  <SelectGroup>
    <SelectLabel>Book Categories</SelectLabel>
    <SelectItem value="fiction">
      Fiction
    </SelectItem>
    <SelectItem value="non-fiction">
      Non-Fiction
    </SelectItem>
    <SelectItem value="mystery">
      Mystery
    </SelectItem>
    <SelectItem value="fantasy">
      Fantasy
    </SelectItem>
    <SelectItem value="biography">
      Biography
    </SelectItem>
    <SelectItem value="science-fiction">
      Science Fiction
    </SelectItem>
    <SelectItem value="romance">
      Romance
    </SelectItem>
    <SelectItem value="historical">
      Historical
    </SelectItem>
    <SelectItem value="self-help">
      Self-Help
    </SelectItem>
    <SelectItem value="thriller">
      Thriller
    </SelectItem>
    <SelectItem value="young-adult">
      Young Adult
    </SelectItem>
    <SelectItem value="children">
      Children
    </SelectItem>
    <SelectItem value="horror">
      Horror
    </SelectItem>
    <SelectItem value="poetry">
      Poetry
    </SelectItem>
    <SelectItem value="graphic-novel">
      Graphic Novel
    </SelectItem>
  </SelectGroup>
</SelectContent>
  </Select>
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="subject">Name</Label>
        <Input id="subject" placeholder="The name of the book"  v-model="bookName" />
      </div>
      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please add description so that you can find book through its contents"
          v-model="bookDescription"
          ></Textarea>
      </div>
       <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="pdf">Pdf</Label>
    <Input id="pdf" type="file" @change="handleFileUpload" />
  </div>
    </CardContent>

      <DialogFooter>
        <CardFooter class="justify-between space-x-2">
      <Button @click="addNewBook">Add</Button>
    </CardFooter>
      </DialogFooter>
    </DialogContent>
  </Dialog>
      <Avatar>
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>     

       <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

      </div>
      </nav>
    <div class="flex justify-center items-center mt-[150px] w-[100%] ">     
    <Command class="rounded-lg border shadow-md max-w-[750px]">
    <CommandInput placeholder="Type a command or search..." v-model="query" @keydown="searchBook" />

    <div v-for="book in filterbooks":key=book.id></div>
    <CommandList> 
      <CommandGroup heading="Suggestions" v-for="book in searchResult" :id="book[2]">
      <CommandItem value="Books"> 
          <Book class="mr-2 h-4 w-4" />
          <span>{{ book[0] }}</span>
      </CommandItem>
      </CommandGroup>
      </CommandList>
    </Command>
 </div>
  <div class="flex justify-between items-center w-[70%] mt-[40px]">
      <h2>
        Results 
      </h2>
        <div class="flex items-center space-x-2">
    <Switch id="airplane-mode"  @click="handleSwitchState" />
    <Label for="airplane-mode">Read</Label>
     <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select Categories" />
    </SelectTrigger>
  <SelectContent>
  <SelectGroup>
    <SelectLabel>Book Categories</SelectLabel>
    <SelectItem value="fiction">
      Fiction
    </SelectItem>
    <SelectItem value="non-fiction">
      Non-Fiction
    </SelectItem>
    <SelectItem value="mystery">
      Mystery
    </SelectItem>
    <SelectItem value="fantasy">
      Fantasy
    </SelectItem>
    <SelectItem value="biography">
      Biography
    </SelectItem>
    <SelectItem value="science-fiction">
      Science Fiction
    </SelectItem>
    <SelectItem value="romance">
      Romance
    </SelectItem>
    <SelectItem value="historical">
      Historical
    </SelectItem>
    <SelectItem value="self-help">
      Self-Help
    </SelectItem>
    <SelectItem value="thriller">
      Thriller
    </SelectItem>
    <SelectItem value="young-adult">
      Young Adult
    </SelectItem>
    <SelectItem value="children">
      Children
    </SelectItem>
    <SelectItem value="horror">
      Horror
    </SelectItem>
    <SelectItem value="poetry">
      Poetry
    </SelectItem>
    <SelectItem value="graphic-novel">
      Graphic Novel
    </SelectItem>
  </SelectGroup>
</SelectContent>
  </Select>

  </div>
     </div>
  <div class="flex flex-wrap w-[70%] mt-[50px]">
  <Card class="w-[350px] ml-[65px] mt-5 animate-jump-in" v-for="book in books" :id="book.id">
    <CardHeader>
      <CardTitle>{{ book.name }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-row justify-center items-center">
      <CardDescription>{{ book.description }}
      <p class="text-gray-400">{{ book.category }}</p>
      </CardDescription>
      <!-- <img class="rounded-lg" src="./assets/imgs/image.png" alt="" srcset="">   -->
    </CardContent>
    <CardFooter class="flex justify-end px-6 pb-6">
      <Button @click="readBook(book.id,book.path)">Read</Button>
    </CardFooter>
  </Card>
  </div>
</div>
</template>



