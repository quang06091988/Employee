<!-- USERS MODULE -->
<!-- User Entity -->
- id
- username
- password
<!-- Users Controller -->
- login
<!--
- requestUrl: @Post('/login')
- requesDto: @Body({username, password})
-->
- Logout
<!--
- requestUrl: @Post('/logout')
-->

<!-- PRICES MODULE -->
<!-- Price Entity -->
- id
- provider <!-- Relation between Price with Provider: many to one -->
- product <!-- Relation between Price with Product: many to one -->
- importPricePerWholesaleUnit
<!-- Prices Controller -->
 - insertPrice
<!-- 
- requestUrl: @Post('/')
- requestDto: @Body({productId, providerId, importPricePerWholesaleUnit})
-->
- updatePrice
<!--
- requestUrl: @Put('/')
- requestDto: @Body({productId, providerId, importPricePerWholesaleUnit})
-->
- removePrice
<!--
- requestUrl: @Delete('/')
- requestDto: @Body({productId, providerId})
-->
-findPrices
<!--
- requestUrl: @Get('/')
- requestDto: @Body({productId?, providerId?})
-->
- caculateProfitPerRetailUnit
<!--
- requestUrl: @Get('/caculate-profit-per-retail-unit/:productId')
- requestDto: @Param({productId})
- responseDto: {productName, providerName, productSellPricePerRetailUnit, importPricePerRetailUnit, profitPricePerRetailUnit}
-->

<!-- PRODUCTS MODULE -->
<!-- Product Entity -->
- id
- name
- wholesaleUnit
- retailUnit
- numberOfRetailUnitPerWholesaleUnit
- sellPricePerRetailUnit
- prices <!-- Relation between Product with Price: one to many -->

<!-- PROVIDERS MODULE -->
<!-- Provider Entity -->
- id
- name
- prices <!-- Relation between Provider with Price: one to many -->

