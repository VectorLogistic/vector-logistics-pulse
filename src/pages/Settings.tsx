import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Users,
  Truck,
  Settings2
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Настройки</h1>
          <p className="text-muted-foreground">
            Управляйте настройками вашей учетной записи и компании
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-fit">
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Аккаунт</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Компания</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Уведомления</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Безопасность</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Личная информация</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" defaultValue="Алексей" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" defaultValue="Петров" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@transport.ru" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" defaultValue="+7 (495) 123-45-67" />
                </div>
                <Separator />
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5" />
                  <span>Информация о компании</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Название компании</Label>
                  <Input id="companyName" defaultValue="Транспорт Плюс" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН</Label>
                  <Input id="inn" defaultValue="1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" defaultValue="г. Москва, ул. Примерная, д. 123" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="drivers">Количество водителей</Label>
                    <Input id="drivers" defaultValue="25" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicles">Количество ТС</Label>
                    <Input id="vehicles" defaultValue="18" type="number" />
                  </div>
                </div>
                <Separator />
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">25</div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center">
                      <Users className="w-4 h-4 mr-1" />
                      Водителей
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">18</div>
                    <p className="text-sm text-muted-foreground flex items-center justify-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Транспортных средств
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <p className="text-sm text-muted-foreground">Рейсов в месяц</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Настройки уведомлений</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Email уведомления</div>
                    <div className="text-sm text-muted-foreground">
                      Получать уведомления на email
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Уведомления о рейсах</div>
                    <div className="text-sm text-muted-foreground">
                      Уведомления о начале и завершении рейсов
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Технические уведомления</div>
                    <div className="text-sm text-muted-foreground">
                      Уведомления о техническом обслуживании ТС
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base font-medium">Отчёты</div>
                    <div className="text-sm text-muted-foreground">
                      Еженедельные отчёты о деятельности
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Безопасность</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Смена пароля</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button variant="outline">Изменить пароль</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Двухфакторная аутентификация</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-base">2FA</div>
                      <div className="text-sm text-muted-foreground">
                        Дополнительная защита аккаунта
                      </div>
                    </div>
                    <Badge variant="outline">Не активно</Badge>
                  </div>
                  <Button variant="outline" className="mt-3">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Настроить 2FA
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Активные сессии</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Текущая сессия</div>
                        <div className="text-sm text-muted-foreground">
                          Chrome на Windows • 192.168.1.1
                        </div>
                      </div>
                      <Badge>Активна</Badge>
                    </div>
                    <Button variant="destructive" size="sm">
                      Завершить все сессии
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;