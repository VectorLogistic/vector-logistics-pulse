import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Users,
  Truck,
  Settings2,
  UserCheck,
  History,
  Eye,
  Coins,
  FileText,
  Calculator,
  ShieldCheck
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Settings = () => {
  const roles = [
    {
      id: "admin",
      name: "Администратор",
      description: "Полный доступ ко всем функциям системы",
      permissions: {
        viewDashboard: true,
        viewFinances: true,
        manageUsers: true,
        manageFleet: true,
        viewReports: true,
        manageSettings: true,
        audit: true
      }
    },
    {
      id: "accountant", 
      name: "Бухгалтер",
      description: "Доступ к финансовой отчетности и управлению",
      permissions: {
        viewDashboard: true,
        viewFinances: true,
        manageUsers: false,
        manageFleet: false,
        viewReports: true,
        manageSettings: false,
        audit: false
      }
    },
    {
      id: "logistician",
      name: "Логист", 
      description: "Управление рейсами и транспортом",
      permissions: {
        viewDashboard: false, // не может видеть доходы
        viewFinances: false,
        manageUsers: false,
        manageFleet: true,
        viewReports: true,
        manageSettings: false,
        audit: false
      }
    }
  ];

  const users = [
    { id: 1, name: "Алексей Петров", email: "admin@transport.ru", role: "admin", status: "active" },
    { id: 2, name: "Мария Иванова", email: "maria@transport.ru", role: "accountant", status: "active" },
    { id: 3, name: "Дмитрий Сидоров", email: "dmitry@transport.ru", role: "logistician", status: "active" },
    { id: 4, name: "Елена Козлова", email: "elena@transport.ru", role: "logistician", status: "inactive" },
  ];

  const auditLogs = [
    { id: 1, user: "Алексей Петров", action: "Создал нового водителя", timestamp: "2024-01-15 14:30", details: "Добавлен водитель: Иванов И.И." },
    { id: 2, user: "Мария Иванова", action: "Изменила финансовый отчет", timestamp: "2024-01-15 13:15", details: "Обновлен отчет за декабрь 2023" },
    { id: 3, user: "Дмитрий Сидоров", action: "Назначил рейс", timestamp: "2024-01-15 12:00", details: "Рейс МСК-СПБ назначен водителю Петров А.А." },
    { id: 4, user: "Алексей Петров", action: "Изменил роли пользователя", timestamp: "2024-01-15 11:45", details: "Роль пользователя elena@transport.ru изменена на логист" },
    { id: 5, user: "Мария Иванова", action: "Экспортировала отчет", timestamp: "2024-01-15 10:30", details: "Экспорт финансового отчета за январь" },
  ];

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
          <TabsList className="grid grid-cols-7 w-fit">
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
            <TabsTrigger value="roles" className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Роли</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4" />
              <span>Пользователи</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>Аудит</span>
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

          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Управление ролями</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {roles.map((role) => (
                  <div key={role.id} className="space-y-4 p-4 border rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-dashboard`} 
                          checked={role.permissions.viewDashboard}
                        />
                        <Label htmlFor={`${role.id}-dashboard`} className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>Просмотр дашборда</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-finances`} 
                          checked={role.permissions.viewFinances}
                        />
                        <Label htmlFor={`${role.id}-finances`} className="flex items-center space-x-1">
                          <Coins className="w-4 h-4" />
                          <span>Просмотр финансов</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-users`} 
                          checked={role.permissions.manageUsers}
                        />
                        <Label htmlFor={`${role.id}-users`} className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Управление пользователями</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-fleet`} 
                          checked={role.permissions.manageFleet}
                        />
                        <Label htmlFor={`${role.id}-fleet`} className="flex items-center space-x-1">
                          <Truck className="w-4 h-4" />
                          <span>Управление автопарком</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-reports`} 
                          checked={role.permissions.viewReports}
                        />
                        <Label htmlFor={`${role.id}-reports`} className="flex items-center space-x-1">
                          <FileText className="w-4 h-4" />
                          <span>Просмотр отчетов</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`${role.id}-settings`} 
                          checked={role.permissions.manageSettings}
                        />
                        <Label htmlFor={`${role.id}-settings`} className="flex items-center space-x-1">
                          <Settings2 className="w-4 h-4" />
                          <span>Управление настройками</span>
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator />
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения ролей
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserCheck className="w-5 h-5" />
                  <span>Управление пользователями</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Select defaultValue={user.role}>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border shadow-md z-50">
                              <SelectItem value="admin">Администратор</SelectItem>
                              <SelectItem value="accountant">Бухгалтер</SelectItem>
                              <SelectItem value="logistician">Логист</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status === "active" ? "Активен" : "Неактивен"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Редактировать
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6">
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Добавить пользователя
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Аудит операций</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-4">
                  <Input placeholder="Поиск по действиям..." className="max-w-sm" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Фильтр по пользователю" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-md z-50">
                      <SelectItem value="all">Все пользователи</SelectItem>
                      <SelectItem value="admin">Алексей Петров</SelectItem>
                      <SelectItem value="accountant">Мария Иванова</SelectItem>
                      <SelectItem value="logistician">Дмитрий Сидоров</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Действие</TableHead>
                      <TableHead>Время</TableHead>
                      <TableHead>Детали</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="text-muted-foreground">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline">
                    <Calculator className="w-4 h-4 mr-2" />
                    Экспорт журнала
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Показано: 5 из 156 записей
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