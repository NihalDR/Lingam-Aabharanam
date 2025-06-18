
import { getProducts } from './productService';
import { getAppointments } from './appointmentService';
import { getAllCustomers } from './customerService';

export type AdminStats = {
  totalProducts: number;
  totalAppointments: number;
  totalCustomers: number;
  recentProducts: number;
  recentAppointments: number;
  featuredProducts: number;
};

export type RecentActivity = {
  id: string;
  type: 'product' | 'appointment' | 'customer';
  title: string;
  description: string;
  timestamp: Date;
};

// Get admin dashboard statistics
export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    console.log('Fetching admin dashboard stats from localStorage...');
    
    // Get data from localStorage services
    const products = await getProducts();
    const appointments = await getAppointments();
    const customers = await getAllCustomers();
    
    // Calculate recent items (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentProducts = products.filter(product => 
      new Date(product.createdAt) >= sevenDaysAgo
    ).length;
    
    const recentAppointments = appointments.filter(appointment => 
      new Date(appointment.createdAt) >= sevenDaysAgo
    ).length;
    
    const featuredProducts = products.filter(product => product.featured).length;

    const stats: AdminStats = {
      totalProducts: products.length,
      totalAppointments: appointments.length,
      totalCustomers: customers.length,
      recentProducts,
      recentAppointments,
      featuredProducts,
    };

    console.log('Admin stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    // Return default stats if there's an error
    return {
      totalProducts: 0,
      totalAppointments: 0,
      totalCustomers: 0,
      recentProducts: 0,
      recentAppointments: 0,
      featuredProducts: 0,
    };
  }
};

// Get recent activity for admin dashboard
export const getRecentActivity = async (): Promise<RecentActivity[]> => {
  try {
    console.log('Fetching recent activity from localStorage...');
    
    const activities: RecentActivity[] = [];
    const products = await getProducts();
    const appointments = await getAppointments();
    const customers = await getAllCustomers();

    // Get recent products (last 5)
    const recentProducts = products
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    recentProducts.forEach(product => {
      activities.push({
        id: product.id,
        type: 'product',
        title: 'New Product Added',
        description: product.name,
        timestamp: new Date(product.createdAt)
      });
    });

    // Get recent appointments (last 5)
    const recentAppointments = appointments
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    recentAppointments.forEach(appointment => {
      activities.push({
        id: appointment.id,
        type: 'appointment',
        title: 'New Appointment',
        description: `${appointment.name} - ${appointment.purpose}`,
        timestamp: new Date(appointment.createdAt)
      });
    });

    // Get recent customers (last 5)
    const recentCustomers = customers
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    
    recentCustomers.forEach(customer => {
      activities.push({
        id: customer.id,
        type: 'customer',
        title: 'New Customer Registered',
        description: customer.name,
        timestamp: new Date(customer.createdAt)
      });
    });

    // Sort by timestamp (most recent first) and limit to 10
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    console.log('Recent activities:', activities.slice(0, 10));
    return activities.slice(0, 10);
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
};

// Bulk operations for products
export const bulkUpdateProducts = async (
  productIds: string[], 
  updates: { featured?: boolean; inStock?: boolean }
): Promise<boolean> => {
  try {
    console.log('Bulk updating products:', { productIds, updates });
    
    const products = await getProducts();
    let hasChanges = false;
    
    products.forEach(product => {
      if (productIds.includes(product.id)) {
        if (updates.featured !== undefined) {
          product.featured = updates.featured;
          hasChanges = true;
        }
        if (updates.inStock !== undefined) {
          product.inStock = updates.inStock;
          hasChanges = true;
        }
      }
    });
    
    if (hasChanges) {
      // Save updated products back to localStorage
      try {
        localStorage.setItem('admin_products', JSON.stringify(products));
      } catch (error) {
        console.error('Error saving bulk updates:', error);
        return false;
      }
    }

    console.log('Bulk update successful');
    return true;
  } catch (error) {
    console.error('Error in bulkUpdateProducts:', error);
    return false;
  }
};

// System health check for localStorage
export const checkSystemHealth = async (): Promise<{
  database: boolean;
  productsTable: boolean;
  appointmentsTable: boolean;
  profilesTable: boolean;
}> => {
  try {
    console.log('Checking localStorage system health...');
    
    const health = {
      database: false,
      productsTable: false,
      appointmentsTable: false,
      profilesTable: false
    };

    // Test localStorage availability
    try {
      const testKey = 'health_check_test';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      health.database = true;
    } catch (e) {
      console.error('localStorage not available:', e);
    }

    // Test products data access
    try {
      await getProducts();
      health.productsTable = true;
    } catch (e) {
      console.error('Products data access failed:', e);
    }

    // Test appointments data access
    try {
      await getAppointments();
      health.appointmentsTable = true;
    } catch (e) {
      console.error('Appointments data access failed:', e);
    }

    // Test customers data access (profiles equivalent)
    try {
      await getAllCustomers();
      health.profilesTable = true;
    } catch (e) {
      console.error('Customers data access failed:', e);
    }

    console.log('System health:', health);
    return health;
  } catch (error) {
    console.error('Error checking system health:', error);
    return {
      database: false,
      productsTable: false,
      appointmentsTable: false,
      profilesTable: false
    };
  }
};
