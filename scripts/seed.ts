import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🌱 Seeding database...')

    // Create admin user
    const adminUser = await prisma.admin.upsert({
      where: { email: 'admin@vesnaclinic.com' },
      update: {},
      create: {
        email: 'admin@vesnaclinic.com',
        password: await bcrypt.hash('admin123', 10),
        name: 'Admin User'
      }
    })

    console.log('✅ Admin user created:', adminUser.email)

    // Create site settings
    const siteSettings = await prisma.siteSettings.upsert({
      where: { id: 'site-settings' },
      update: {},
      create: {
        id: 'site-settings',
        siteName: 'Vesna Hair Clinic',
        tagline: 'Türkiye\'nin en güvenilen saç kliniği',
        description: 'Profesyonel saç ekimi ve saç bakım hizmetleri ile doğal, kalıcı sonuçlar',
        whatsappNumber: '+90 532 000 00 00',
        instagramUrl: 'https://instagram.com/vesnaclinic',
        facebookUrl: 'https://facebook.com/vesnaclinic',
        address: 'İstanbul, Türkiye',
        phone: '+90 212 000 00 00',
        email: 'info@vesnaclinic.com',
        workingHours: 'Pazartesi - Cumartesi: 09:00 - 19:00',
        logo: '/images/logo.svg',
        favicon: '/images/favicon.ico'
      }
    })

    console.log('✅ Site settings created')

    // Create sample services
    const services = [
      {
        id: 'fue-hair-transplant',
        title: 'FUE Saç Ekimi',
        description: 'Follicular Unit Extraction (FUE) teknolojisi ile doğal saç ekimi',
        content: 'FUE saç ekimi, saç köklerinin tek tek alınarak kıl boşluğu olmadan transplantasyon yapılmasını sağlayan modern bir tekniktir. Bu yöntem ile oldukça doğal sonuçlar elde edilir.',
        price: '2500-4000 €',
        duration: '6-8 saat',
        image: '/images/fue-hair-transplant.jpg',
        order: 1
      },
      {
        id: 'dhi-hair-transplant',
        title: 'DHI Saç Ekimi',
        description: 'Direct Hair Implantation ile hassas saç ekimi',
        content: 'DHI yöntemi, saç köklerinin özel kalemlerle doğrudan ekilmesini sağlar. Bu teknik ile daha yoğun ve doğal sonuçlar elde edilir.',
        price: '3000-5000 €',
        duration: '7-9 saat',
        image: '/images/dhi-hair-transplant.jpg',
        order: 2
      },
      {
        id: 'prp-therapy',
        title: 'PRP Tedavisi',
        description: 'Platelet Rich Plasma ile saç güçlendirme',
        content: 'PRP tedavisi, hastanın kendi kanından elde edilen trombositlerle saç köklerinin güçlendirilmesini sağlar. Doğal ve güvenli bir yöntemdir.',
        price: '300-500 €',
        duration: '1-2 saat',
        image: '/images/prp-therapy.jpg',
        order: 3
      },
      {
        id: 'mesotherapy',
        title: 'Mesotherapi',
        description: 'Saç derisine vitamin ve mineral desteği',
        content: 'Mesotherapi, saç derisine vitamin, mineral ve amino asit karışımının enjekte edilmesiyle saç sağlığının artırılmasını sağlar.',
        price: '200-400 €',
        duration: '30-45 dakika',
        image: '/images/mesotherapy.jpg',
        order: 4
      }
    ]

    for (const service of services) {
      await prisma.service.upsert({
        where: { id: service.id },
        update: {},
        create: service
      })
    }

    console.log('✅ Sample services created')

    // Create sample testimonials
    const testimonials = [
      {
        id: 'testimonial-1',
        name: 'Mehmet Yılmaz',
        content: 'Harika bir deneyim yaşadım. Sonuçlar beklediğimden çok daha iyi.',
        rating: 5,
        image: '/images/avatar-1.jpg',
        location: 'İstanbul',
        order: 1
      },
      {
        id: 'testimonial-2',
        name: 'Ayşe Demir',
        content: 'Profesyonel ekip ve mükemmel hizmet. Herkese tavsiye ederim.',
        rating: 5,
        image: '/images/avatar-2.jpg',
        location: 'Ankara',
        order: 2
      },
      {
        id: 'testimonial-3',
        name: 'Ali Kara',
        content: 'Saç ekimi işlemi çok başarılı geçti. Teşekkürler.',
        rating: 5,
        image: '/images/avatar-3.jpg',
        location: 'İzmir',
        order: 3
      }
    ]

    for (const testimonial of testimonials) {
      await prisma.testimonial.upsert({
        where: { id: testimonial.id },
        update: {},
        create: testimonial
      })
    }

    console.log('✅ Sample testimonials created')

    // Create sample pages
    const pages = [
      {
        title: 'Hakkımızda',
        slug: 'hakkimizda',
        content: 'Vesna Hair Clinic olarak, saç sağlığı ve estetiği alanında uzman kadromuzla hizmet vermekteyiz...',
        metaTitle: 'Hakkımızda - Vesna Hair Clinic',
        metaDescription: 'Vesna Hair Clinic hakkında bilgi alın. Uzman kadromuz ve modern teknolojimizle saç sağlığınız için buradayız.',
        order: 1
      },
      {
        title: 'Hizmetlerimiz',
        slug: 'hizmetler',
        content: 'Modern saç ekimi teknikleri ve saç bakım hizmetlerimiz ile size en iyi sonuçları sunuyoruz...',
        metaTitle: 'Hizmetlerimiz - Vesna Hair Clinic',
        metaDescription: 'FUE, DHI saç ekimi, PRP tedavisi ve daha fazlası. Saç sağlığınız için profesyonel hizmetler.',
        order: 2
      }
    ]

    for (const page of pages) {
      await prisma.page.upsert({
        where: { slug: page.slug },
        update: {},
        create: page
      })
    }

    console.log('✅ Sample pages created')

    console.log('🎉 Database seeding completed!')
    console.log('\n📋 Admin Panel Access:')
    console.log('URL: http://localhost:3000/admin')
    console.log('Email: admin@vesnaclinic.com')
    console.log('Password: admin123')
    console.log('\n⚠️  Don\'t forget to change the default password in production!')

  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }) 