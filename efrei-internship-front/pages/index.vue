<template>
    <div class="m-5">
        <header>
            <nav>
                <ul class="text-blue-600">
                    <li class="hover:text-blue-800"><NuxtLink to="login">Login</NuxtLink></li>
                    <li class="hover:text-blue-800"><NuxtLink to="about">About</NuxtLink></li>
                    <li class="hover:text-blue-800"><NuxtLink to="internship/Internships">Internships</NuxtLink></li>
                </ul>
            </nav>
        </header>
        <div class="text-2xl text-center">Home Page - Child component below</div>
        <ButtonCounter/>
    </div>
</template>