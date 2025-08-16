import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown,
  Truck, 
  Users, 
  MapPin, 
  Coins,
  Calendar,
  AlertTriangle
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Всего машин",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: <Truck className="w-4 h-4" />
    },
    {
      title: "Водители",
      value: "18",
      change: "+1",
      changeType: "positive",
      icon: <Users className="w-4 h-4" />
    },
    {
      title: "Активные рейсы",
      value: "12",
      change: "+3",
      changeType: "positive",
      icon: <MapPin className="w-4 h-4" />
    },
    {
      title: "Доход за месяц",
      value: "₽2,450,000",
      change: "+12%",
      changeType: "positive",
      icon: <Coins className="w-4 h-4" />
    }
  ];

  const activeTrips = [
    {
      id: "TRP-001",
      route: "Москва → Санкт-Петербург",
      driver: "Иванов А.П.",
      vehicle: "КамАЗ 5490 (А123БВ199)",
      status: "В пути",
      progress: 65
    },
    {
      id: "TRP-002",
      route: "Екатеринбург → Новосибирск",
      driver: "Петров В.С.",
      vehicle: "МАЗ 6430 (В456ГД777)",
      status: "В пути",
      progress: 32
    },
    {
      id: "TRP-003",
      route: "Казань → Ростов-на-Дону",
      driver: "Сидоров М.И.",
      vehicle: "Volvo FH16 (С789ЕЖ199)",
      status: "Загрузка",
      progress: 0
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      message: "Превышен расход топлива у МАЗ 6430",
      time: "2 часа назад",
      type: "warning"
    },
    {
      id: 2,
      message: "Водитель Иванов А.П. превысил рабочее время",
      time: "4 часа назад",
      type: "alert"
    },
    {
      id: 3,
      message: "Рейс TRP-004 завершён успешно",
      time: "6 часов назад",
      type: "success"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold">Дашборд</h1>
          <p className="text-muted-foreground">
            Обзор ключевых показателей вашего автопарка
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover-lift border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "positive" ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-success" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-destructive" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">за неделю</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Active Trips */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Активные рейсы</span>
              </CardTitle>
              <CardDescription>
                Текущие рейсы в пути
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{trip.id}</span>
                        <Badge 
                          variant={trip.status === "В пути" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {trip.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{trip.route}</p>
                      <p className="text-xs text-muted-foreground">{trip.driver} • {trip.vehicle}</p>
                      {trip.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Прогресс</span>
                            <span>{trip.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${trip.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Последние уведомления</span>
              </CardTitle>
              <CardDescription>
                Важные события и предупреждения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      alert.type === "warning" ? "bg-warning" :
                      alert.type === "alert" ? "bg-destructive" : "bg-success"
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Обзор за неделю</CardTitle>
            <CardDescription>
              Сводка по основным показателям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Завершённых рейсов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">98.5%</div>
                <div className="text-sm text-muted-foreground">Успешность доставки</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">24,567</div>
                <div className="text-sm text-muted-foreground">Пройдено км</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">₽845,220</div>
                <div className="text-sm text-muted-foreground">Расходы на топливо</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;