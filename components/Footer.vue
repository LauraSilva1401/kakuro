<template>

    <div class="foot">
        <footer class="py-3">

            <ul class="nav justify-content-center pb-3 mb-3">
                <li class="nav-item"><a href="/home" class="nav-link px-2 text-muted">Home</a></li>
                <li class="nav-item"><a href="/userHistory" class="nav-link px-2 text-muted">My History</a></li>
                <li class="nav-item"><a href="/ranking" class="nav-link px-2 text-muted">Global Ranking</a></li>
                <li class="nav-item"><a href="/rules" class="nav-link px-2 text-muted">Kakuro Rules</a></li>
                
            
            </ul>

            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                
                
            
            </ul>
            
            <p class="text-center text-muted lajotek">© 2024 Lajotek, Inc</p>

        </footer>

    </div>

</template>

<style scoped>



footer{

    background-color: white;
    
}



.nav{
    padding-bottom: 0 !important;

    
}

.nav-item, .lajotek{ 
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
}

@media (max-width: 230px) {
    .nav-item, .lajotek {
        font-size: 15px; 
    }

    .nav-link {
        padding: 4px 5px; 
    }

    
}





</style>



