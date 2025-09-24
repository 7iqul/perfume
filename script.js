// 🟢 تعريف كلاس (class): يستخدم لإنشاء نظام الـ Feature Flags
class FeatureFlags {
  // 🟢 Constructor (بناء الكلاس): يتم استدعاؤه عند إنشاء الكائن الجديد
  constructor() {
    // 🟢 تعريف كائن (Object): لتخزين حالة المزايا (Flags)
    this.flags = { 
      darkTheme: false,      // 🟢 خاصية (Property): الوضع الليلي مغلق افتراضيًا
      promoBanner: false,    // 🟢 خاصية: بانر العروض مغلق افتراضيًا
      categories: false      // 🟢 خاصية: الفئات مغلقة افتراضيًا
    };
    this.init(); // 🟢 استدعاء Method (دالة داخل الكلاس) لتهيئة الأحداث
  }

  // 🟢 Method (دالة داخل الكلاس): لتهيئة الأحداث عند تحميل الموقع
  init() {
    // 🟢 Event Listener: يضيف حدث الضغط لكل أزرار التبديل في لوحة التحكم
    document.querySelectorAll('.toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        // 🟢 متغيّر (Variable): يأخذ اسم الميزة من data-flag
        const flagName = toggle.dataset.flag; 
        this.toggleFlag(flagName); // 🟢 استدعاء Method لتغيير حالة الميزة
        toggle.classList.toggle('active'); // 🟢 تغيير الـ CSS عند التفعيل
      });
    });

    this.applyFlags(); // 🟢 استدعاء Method لتطبيق الحالات المبدئية
  }

  // 🟢 Method (دالة داخل الكلاس): تقلب حالة الميزة (من true إلى false أو العكس)
  toggleFlag(flagName) {
    this.flags[flagName] = !this.flags[flagName]; // 🟢 تعديل خاصية في الكائن
    this.applyFlags(); // 🟢 إعادة تطبيق التغيرات
    console.log(`Feature Flag "${flagName}" is now: ${this.flags[flagName]}`); // 🟢 طباعة في الـ Console
  }

  // 🟢 Method: ترجع حالة الميزة (مفعلة أو لا)
  isEnabled(flagName) {
    return this.flags[flagName];
  }

  // 🟢 Method: تطبق الحالات على الموقع (تشغيل أو إيقاف)
  applyFlags() {
    // 🟢 شرط (If): إذا الوضع الليلي مفعّل أضف كلاس dark-theme إلى الـ body
    if (this.isEnabled('darkTheme')) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    // 🟢 تفعيل أو إخفاء بانر العروض
    const promoBanner = document.getElementById('promoBanner'); // 🟢 متغير عنصر DOM
    promoBanner.style.display = this.isEnabled('promoBanner') ? 'block' : 'none';

    // 🟢 تفعيل أو إخفاء الفئات
    const categories = document.getElementById('categories'); // 🟢 متغير عنصر DOM
    categories.style.display = this.isEnabled('categories') ? 'grid' : 'none';
  }
}

// 🟢 إنشاء كائن (Instance) من الكلاس FeatureFlags
const featureFlags = new FeatureFlags();

// 🟢 Event Listener: لكل زر شراء في المنتجات
document.querySelectorAll('.product-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // 🟢 متغير يأخذ اسم المنتج
    const productName = this.parentElement.querySelector('.product-name').textContent; 
    this.textContent = 'تم الإضافة!'; // 🟢 تغيير نص الزر مؤقتًا
    this.style.background = '#27ae60'; // 🟢 تغيير لون الزر مؤقتًا
    
    // 🟢 setTimeout (دالة مدمجة): ترجع الزر لحالته بعد 2 ثانية
    setTimeout(() => {
      this.textContent = this.getAttribute('data-ar'); // 🟢 يرجع للنص العربي
      this.style.background = '#a9745b';
    }, 2000);
    
    console.log(`تم إضافة ${productName} إلى السلة`); // 🟢 طباعة في الـ Console
  });
});

// 🟢 Event Listener: للتنقل السلس عند الضغط على روابط القائمة
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // 🟢 منع التصرف الافتراضي للرابط
    const targetId = this.getAttribute('href'); // 🟢 متغير: يأخذ معرف القسم
    if (targetId.startsWith('#')) { // 🟢 شرط: إذا كان الرابط لقسم داخلي
      const targetElement = document.querySelector(targetId); // 🟢 عنصر القسم
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' }); // 🟢 تمرير سلس للعنصر
      }
    }
  });
});

// 🟢 متغير لتخزين اللغة الحالية
let currentLang = 'ar';

// 🟢 Event Listener: زر تبديل اللغة
document.getElementById('toggleLang').addEventListener('click', () => {
  // 🟢 شرط بسيط لتبديل اللغة
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  changeLanguage(currentLang); // 🟢 استدعاء دالة تغيير اللغة
  // 🟢 تغيير نص الزر نفسه
  document.getElementById('toggleLang').textContent = currentLang === 'ar' ? 'EN' : 'AR';
});

// 🟢 Function (دالة عامة): لتغيير النصوص في الموقع حسب اللغة
function changeLanguage(lang) {
  // 🟢 حلقة على كل العناصر اللي فيها data-ar
  document.querySelectorAll('[data-ar]').forEach(el => {
    // 🟢 تغيير نص العنصر إلى اللغة المختارة
    el.textContent = el.getAttribute(`data-${lang}`);
  });
}
// كود تغيير اللغة
const langSwitch = document.getElementById('langSwitch');
let currentLang = 'ar';

langSwitch.addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  langSwitch.textContent = currentLang === 'ar' ? 'EN' : 'AR';

  document.querySelectorAll('[data-ar]').forEach(el => {
    const newText = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'button') {
      el.value = newText;
      el.textContent = newText;
    } else {
      el.innerHTML = newText;
    }
  });

  // الاتجاه RTL أو LTR
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = currentLang;
});
