<template>
    <div class="p-2 border-b-2 border-black">
        <div class="text-xl mb-1">Efrei Internship | Academic Tutor Section</div>
        <nav>
            <ul class="text-white bg-teal-500 p-1 rounded-md flex flex-row justify-between">
                <li class="hover:bg-teal-800 bg-teal-600 w-fit p-2 rounded-md"><NuxtLink to="internships/list">Internships</NuxtLink></li>
                <li class="hover:bg-teal-200 bg-teal-100 text-teal-700 w-fit p-2 rounded-md">Disconnect <font-awesome-icon class="ml-0.5" :icon="['fas', 'arrow-right-from-bracket']" /></li>
            </ul>
        </nav>
    </div>
</template>