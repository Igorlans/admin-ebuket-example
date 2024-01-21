-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "shop_name" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(80),
    "description" TEXT,
    "name" VARCHAR(70) NOT NULL,
    "phone" VARCHAR(25) NOT NULL,
    "email" VARCHAR(70) NOT NULL,
    "password" VARCHAR(120),
    "prefer_viber" BOOLEAN,
    "prefer_telegram" BOOLEAN,
    "prefer_phone" BOOLEAN,
    "prefer_email" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "prefer_courier" BOOLEAN,
    "time_delivery" VARCHAR(10) NOT NULL,
    "price_delivery" VARCHAR(10) NOT NULL,
    "free_delivery_from" VARCHAR(10),
    "advanced_delivery" BOOLEAN NOT NULL,
    "divergence_time" VARCHAR(70) NOT NULL,
    "prefer_pickup" BOOLEAN NOT NULL,
    "prefer_in_time" BOOLEAN NOT NULL,
    "price_in_time" VARCHAR(25) NOT NULL,
    "repeat_delivery" BOOLEAN NOT NULL,
    "price_in_repeat" VARCHAR(10) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery_rates" (
    "id" SERIAL NOT NULL,
    "idDeliver" INTEGER NOT NULL,
    "time_from" VARCHAR(5) NOT NULL,
    "time_to" VARCHAR(5) NOT NULL,
    "rate_price_delivery" VARCHAR(10) NOT NULL,
    "rate_prefer_free_from" BOOLEAN NOT NULL,
    "rate_free_delivery_from" VARCHAR(10) NOT NULL,

    CONSTRAINT "Delivery_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pickup_list" (
    "id" SERIAL NOT NULL,
    "idDeliver" INTEGER NOT NULL,
    "address" VARCHAR(50) NOT NULL,
    "weekdays_time_from" VARCHAR(5) NOT NULL,
    "weekdays_time_to" VARCHAR(5) NOT NULL,
    "weekend_time_from" VARCHAR(5) NOT NULL,
    "weekend_time_to" VARCHAR(5) NOT NULL,
    "type_payment" VARCHAR(15) NOT NULL,

    CONSTRAINT "Pickup_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "prefer_cash" BOOLEAN NOT NULL,
    "prefer_prepayment" BOOLEAN NOT NULL,
    "sum_prepayment" INTEGER,
    "prefer_all_payment" BOOLEAN NOT NULL,
    "payment_card" VARCHAR(25),
    "fio_card" VARCHAR(60),
    "name_bank" VARCHAR(25) NOT NULL,
    "prefer_payment_number" BOOLEAN NOT NULL,
    "payment_number" VARCHAR(50),
    "prefer_cashless" BOOLEAN NOT NULL,
    "prefer_crypto" BOOLEAN NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store_schedule" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "order_schedule" JSONB NOT NULL,
    "couriers_schedule" JSONB NOT NULL,

    CONSTRAINT "Store_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store_flower" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "id_flower" INTEGER NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "color" VARCHAR(25) NOT NULL,
    "price" INTEGER NOT NULL,
    "variety" VARCHAR(30),
    "comment" TEXT,
    "height" VARCHAR(15) NOT NULL,
    "prefer_stock" BOOLEAN NOT NULL,

    CONSTRAINT "Store_flower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decor" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "title" VARCHAR(70) NOT NULL,
    "characteristic" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "comment" TEXT,
    "prefer_stock" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Decor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addition" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "type_addition" VARCHAR(40) NOT NULL,
    "price" INTEGER NOT NULL,
    "prefer_free" BOOLEAN NOT NULL,
    "img_hash" VARCHAR(50) NOT NULL,
    "status_moderation" VARCHAR(50) NOT NULL,
    "prefer_stock" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Addition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buket" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "category_buket" VARCHAR(40) NOT NULL,
    "name_buket" VARCHAR(40) NOT NULL,
    "size_width" VARCHAR(10) NOT NULL,
    "size_height" VARCHAR(10) NOT NULL,
    "time_build" VARCHAR(10) NOT NULL,
    "occasion" JSONB NOT NULL,
    "images_hash" JSONB NOT NULL,
    "flowers" JSONB NOT NULL,
    "decors" JSONB NOT NULL,
    "additions" JSONB NOT NULL,
    "price" INTEGER NOT NULL,
    "prefer_stock" BOOLEAN NOT NULL,
    "status_moderation" VARCHAR(35) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "id_buket" INTEGER NOT NULL,
    "photo_hash" VARCHAR(50),
    "describe" TEXT,
    "stars" INTEGER NOT NULL,
    "buyer_name" VARCHAR(70) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "compliment" JSONB NOT NULL,
    "status_moderation" VARCHAR(60),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addition" (
    "id" SERIAL NOT NULL,
    "title_ua" VARCHAR(70) NOT NULL,
    "title_ru" VARCHAR(70) NOT NULL,

    CONSTRAINT "Flowers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_logo_key" ON "Store"("logo");

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_rates" ADD CONSTRAINT "Delivery_rates_idDeliver_fkey" FOREIGN KEY ("idDeliver") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pickup_list" ADD CONSTRAINT "Pickup_list_idDeliver_fkey" FOREIGN KEY ("idDeliver") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_schedule" ADD CONSTRAINT "Store_schedule_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store_flower" ADD CONSTRAINT "Store_flower_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decor" ADD CONSTRAINT "Decor_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addition" ADD CONSTRAINT "Addition_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buket" ADD CONSTRAINT "Buket_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
