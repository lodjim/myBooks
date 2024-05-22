<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@iconify/vue'

import { useColorMode } from '@vueuse/core'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {ref} from "vue";



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

import {Book} from 'lucide-vue-next'

const result = ref([1,2,3])
const mode = useColorMode() 
</script>


<template>
  <div class="flex flex-col justify-start items-center">
    <nav class="flex flex-row justify-between items-center shadow-md w-[100%]">
      
      <div class="w-[100px] h-[75px] flex justify-center items-center">
      <h1>Logo</h1>
      </div>
      
      <div class="w-[250px] h-[75px] flex justify-evenly items-center">
      <Button> Add 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 m-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Button>
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
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No books found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
      <CommandItem value="Books">
          <Book class="mr-2 h-4 w-4" />
          <span>Sapiens</span>
      </CommandItem>
      </CommandGroup>
      </CommandList>
    </Command>
 </div>
  <div class="flex justify-between items-center w-[70%] mt-[40px]">
      <h2>
        Results 
      </h2>
      <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
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
  <div class="flex flex-wrap w-[70%] mt-[50px]">
  <Card class="w-[350px] ml-[65px] mt-5 animate-jump-in" v-for="data in result" :id="data">
    <CardHeader>
      <CardTitle>To Kill a Mockingbird</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-row justify-center items-center">
      <CardDescription>Set in the racially charged atmosphere of 1930s Alabama, this novel explores themes of racial injustic...
      <p class="text-gray-400">Harper Lee</p>
      </CardDescription>
      <img class="rounded-lg" src="./assets/imgs/image.png" alt="" srcset="">  
    </CardContent>
    <CardFooter class="flex justify-end px-6 pb-6">
      <Button>Read</Button>
    </CardFooter>
  </Card>
  </div>
</div>
</template>



