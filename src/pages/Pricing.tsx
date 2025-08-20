import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Truck, 
  ArrowLeft,
  Star,
  Zap,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Бесплатно",
      price: "0",
      description: "Для небольших компаний до 3 машин",
      icon: <Truck className="w-5 h-5" />,
      color: "bg-gradient-to-br from-slate-600 to-slate-700 shadow-lg",
      features: [
        "До 3 транспортных средств",
        "До 5 водителей",
        "Базовые отчёты",
        "Поддержка по email",
        "Мобильное приложение"
      ],
      limitations: [
        "Ограниченная история рейсов (30 дней)",
        "Базовая аналитика"
      ]
    },
    {
      name: "Профессиональный",
      price: "2990",
      description: "Для растущих транспортных компаний",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-gradient-to-br from-primary to-primary-hover shadow-elegant",
      popular: true,
      features: [
        "До 50 транспортных средств",
        "Неограниченное количество водителей",
        "Расширенные отчёты и аналитика",
        "Автоматический расчёт зарплаты",
        "Планирование маршрутов",
        "Интеграция с 1С",
        "Приоритетная поддержка",
        "Резервное копирование"
      ]
    },
    {
      name: "Бизнес",
      price: "9990",
      description: "Для крупных логистических компаний",
      icon: <Crown className="w-5 h-5" />,
      color: "bg-gradient-to-br from-warning to-amber-600 shadow-lg",
      features: [
        "Неограниченный автопарк",
        "Неограниченное количество водителей",
        "Полная аналитика и отчётность",
        "API для интеграций",
        "Мультифилиальность",
        "Персональный менеджер",
        "Обучение команды",
        "24/7 поддержка",
        "Индивидуальные доработки"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Можно ли отменить подписку?",
      answer: "Да, вы можете отменить подписку в любое время. Доступ к платформе сохранится до конца оплаченного периода."
    },
    {
      question: "Как оплатить?",
      answer: "Мы принимаем оплату банковскими картами, через интернет-банкинг и банковскими переводами для юридических лиц."
    },
    {
      question: "Есть ли скидки при годовой оплате?",
      answer: "Да, при оплате за год мы предоставляем скидку 20% от стоимости месячной подписки."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">VectorLogistic</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Войти</Button>
            </Link>
            <Link to="/login">
              <Button className="shadow-elegant">Попробовать бесплатно</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Выберите свой план
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Масштабируйте свой бизнес с VectorLogistic. Все планы включают основной функционал.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative hover-lift border-0 shadow-soft hover:shadow-elegant transition-all duration-300 ${plan.popular ? 'ring-2 ring-primary bg-gradient-to-b from-primary/5 to-transparent' : 'bg-card'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-hover shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Популярный
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-14 h-14 ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white transform hover:scale-105 transition-transform duration-200`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">₽/мес</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations?.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start space-x-3 text-muted-foreground">
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/login">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-primary-hover shadow-elegant hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200' : 'hover:shadow-soft'}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.price === "0" ? 'Начать бесплатно' : 'Выбрать план'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Card className="bg-primary text-primary-foreground border-0 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Остались вопросы?
                </h3>
                <p className="text-primary-foreground/90 mb-6">
                  Свяжитесь с нами для персональной консультации
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg">
                    Связаться с продажами
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/80 text-white bg-white/10 hover:bg-white hover:text-primary font-medium">
                    Заказать демо
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;