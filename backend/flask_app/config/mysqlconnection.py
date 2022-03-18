import pymysql.cursors

class MySQLConnection:
    def __init__(self,db):
        pyMysSqlConnection = pymysql.connect(host='localhost',
                                           user='root',
                                           password='rootroot',
                                           db=db, 
                                           charset='utf8mb4', 
                                           cursorclass =pymysql.cursors.DictCursor, 
                                           autocommit= True )
        self.connection = pyMysSqlConnection
    
    def query_db(self, query, data = None):
        with self.connection.cursor() as cursor:
            try:
                query = cursor.mogrify(query,data)
                print("Running Query: ", query)
                cursor.execute(query,data)

                if query.lower().find("select") >= 0:
                    result =  cursor.fetchall()
                    return result
                elif query.lower().find("insert") >=0:
                    self.connection.commit()
                    return cursor.lastrowid
                else:
                    self.connection.commit()


            except Exception as e:
                print("something went wrong, ", e)
            
            finally:
                self.connection.close()

def connectToMySQL():
    return MySQLConnection('workbook_schema')