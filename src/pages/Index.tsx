import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  MapPin,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Vector</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </Link>
            <Link to="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              О нас
            </Link>
          </nav>
          
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Star className="w-4 h-4 mr-2" />
            Современная логистика
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            Автоматизация грузоперевозок нового поколения
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Управляйте автопарком, водителями и рейсами в одной платформе. 
            Оптимизируйте расходы и увеличивайте прибыльность вашего бизнеса.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8 shadow-elegant hover-lift">
                Начать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Демо-версия
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Всё для эффективной логистики
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексное решение для управления транспортной компанией
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Управление автопарком</h3>
                <p className="text-muted-foreground">
                  Контролируйте техническое состояние, расход топлива и эффективность использования каждого ТС
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Управление водителями</h3>
                <p className="text-muted-foreground">
                  Учёт рабочего времени, автоматический расчёт зарплаты и контроль производительности
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Планирование рейсов</h3>
                <p className="text-muted-foreground">
                  Оптимальное распределение заказов, маршрутизация и мониторинг выполнения
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Отчёты и аналитика</h3>
                <p className="text-muted-foreground">
                  Детальная аналитика по доходам, расходам и ключевым показателям эффективности
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Экономия времени</h3>
                <p className="text-muted-foreground">
                  Автоматизация рутинных процессов и быстрый доступ к нужной информации
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift border-0 shadow-soft">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Безопасность данных</h3>
                <p className="text-muted-foreground">
                  Надёжная защита информации и резервное копирование в облаке
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-muted-foreground">
              Простые шаги для начала работы
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Регистрация</h3>
              <p className="text-muted-foreground">
                Создайте аккаунт и получите бесплатный доступ к платформе
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Настройка</h3>
              <p className="text-muted-foreground">
                Добавьте автопарк и водителей в систему
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Управление</h3>
              <p className="text-muted-foreground">
                Планируйте рейсы и отслеживайте результаты
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готовы оптимизировать свою логистику?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к сотням компаний, которые уже используют Vector
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Начать бесплатно
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/80 text-black bg-white/10 hover:bg-white hover:text-primary font-medium">
                Посмотреть тарифы
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Vector</span>
              </div>
              <p className="text-muted-foreground">
                Современная платформа для автоматизации грузоперевозок
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#features" className="hover:text-foreground transition-colors">Возможности</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Тарифы</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Обновления</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">Документация</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Справочный центр</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Контакты</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground transition-colors">О нас</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</Link></li>
                <li><Link to="#" className="hover:text-foreground transition-colors">Условия использования</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Vector. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;